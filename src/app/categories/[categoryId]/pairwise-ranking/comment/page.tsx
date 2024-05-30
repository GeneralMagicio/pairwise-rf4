'use client';

import CategoryItem from '@/app/categories/components/CategoryItem';
import Button from '@/app/components/Button';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import TopRouteIndicator from '@/app/components/TopRouteIndicator';
import { Routes } from '@/app/constants/Routes';
import { useCategoryById } from '@/app/features/categories/getCategoryById';
import {
	convertRankingToAttestationFormat,
	getPrevAttestationIds,
} from '@/utils/attest-utils';
import {
	EAS,
	SchemaEncoder,
	SchemaRegistry,
} from '@ethereum-attestation-service/eas-sdk';
import { EASNetworks, SCHEMA_UID, useSigner } from '@/utils/eas';
import { useParams, useRouter } from 'next/navigation';
import { useActiveWallet } from 'thirdweb/react';
import { useProjectsRankingByCategoryId } from '@/app/features/categories/getProjectsRankingByCategoryId';
import { optimismSepolia } from 'thirdweb/chains';
import { useState } from 'react';
import { axios } from '@/lib/axios';
import { Identity } from "@semaphore-protocol/identity"
import { Group } from "@semaphore-protocol/group"
import { generateProof, verifyProof } from "@semaphore-protocol/proof"
import { getMembersGroup, addMemberByApiKey, getGroup } from "@/app/connect/anonvote/utils/bandadaApi"
import supabase from "@/app/connect/anonvote/utils/supabaseClient"
import {
	encodeBytes32String,
	toBigInt,
} from "ethers"

const CategoryRankingComment = () => {
	const router = useRouter();
	const { categoryId } = useParams();
	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const [comment, setComment] = useState('');
	const [commentError, setCommentError] = useState(false);
	const [attestUnderway, setAttestUnderway] = useState(false);

	const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (commentError) setCommentError(false);
		setComment(e.target.value);
	};
	const wallet = useActiveWallet();
	const signer = useSigner();

	const { data: category, isLoading: isCategoryLoading } =
		useCategoryById(+selectedCategoryId);

	const { data: rankingRes, isLoading: isProjectsRankingLoading } =
		useProjectsRankingByCategoryId(+selectedCategoryId);

	const ranking = rankingRes?.data;

	const attest = async () => {
		const localStorageTag = process.env.NEXT_PUBLIC_LOCAL_STORAGE_TAG!
		const identityString = localStorage.getItem(localStorageTag)

		if (!identityString) {
			router.push("/")
			return
		}

		const identity = new Identity(identityString)

		if (comment.length < 100) {
			setCommentError(true);
			return;
		}
		if (!ranking) return;

		setAttestUnderway(true);

		const chainId = optimismSepolia.id;
		const easConfig = EASNetworks[chainId];
		const address = wallet?.getAccount()?.address;

		if (!easConfig) {
			console.error('no eas config');
			return;
		}
		if (!wallet) {
			console.error('no wallet');
			return;
		}
		if (!signer || !address) {
			console.error('signer', signer, 'address', address);
			return;
		}

		const eas = new EAS(easConfig.EASDeployment);
		const schemaRegistry = new SchemaRegistry(easConfig.SchemaRegistry);

		eas.connect(signer as any);
		schemaRegistry.connect(signer as any);
		const schema = await schemaRegistry.getSchema({ uid: SCHEMA_UID });
		const schemaEncoder = new SchemaEncoder(schema.schema);
		// setProgress(ProgressState.Creating);
		try {
			const item = await convertRankingToAttestationFormat(
				ranking.ranking,
				ranking.name,
				comment,
			);

			const schemaData = [
				{ name: 'listName', type: 'string', value: item.listName },
				{
					name: 'listMetadataPtrType',
					type: 'uint256',
					value: item.listMetadataPtrType,
				},
				{
					name: 'listMetadataPtr',
					type: 'string',
					value: item.listMetadataPtr,
				},
			];

			// generate proof of vote
			const groupId = process.env.NEXT_PUBLIC_BANDADA_GROUP_ID!
			const users = await getMembersGroup(groupId)
			if (users) {

				const merkleTreeDepth = 16
				const group = new Group(groupId, merkleTreeDepth, users)
				console.log("going to encode schemaData: ")
				console.log(schemaData)
				const signal = toBigInt(encodeBytes32String(schemaData.toString())).toString()
				const { proof, merkleTreeRoot, nullifierHash } = await generateProof(
					identity,
					group,
					groupId,
					signal
				)
				console.log("generated proof of vote: ", proof);

				const { data: currentMerkleRoot, error: errorRootHistory } = await supabase
					.from("root_history")
					.select()
					.order("created_at", { ascending: false })
					.limit(1)

				if (errorRootHistory) {
					console.log(errorRootHistory)
				}

				if (!currentMerkleRoot) {
					console.error("Wrong currentMerkleRoot")
				}

				if (currentMerkleRoot == null || merkleTreeRoot !== currentMerkleRoot[0].root) {
					// compare merkle tree roots
					const { data: dataMerkleTreeRoot, error: errorMerkleTreeRoot } =
						await supabase.from("root_history").select().eq("root", merkleTreeRoot)

					if (errorMerkleTreeRoot) {
						console.log(errorMerkleTreeRoot)
					}

					if (!dataMerkleTreeRoot) {
						console.error("Wrong dataMerkleTreeRoot")
					} else if (dataMerkleTreeRoot.length === 0) {
						console.log("Merkle Root is not part of the group")
					}

					console.log("dataMerkleTreeRoot", dataMerkleTreeRoot)
					const bandadaGroup = await getGroup(groupId)
					const merkleTreeRootDuration = bandadaGroup?.fingerprintDuration ?? 0

					if (
						dataMerkleTreeRoot &&
						Date.now() >
						Date.parse(dataMerkleTreeRoot[0].created_at) + merkleTreeRootDuration
					) {
						console.log("Merkle Tree Root is expired")
					}
				}

				const { data: nullifier, error: errorNullifierHash } = await supabase
					.from("nullifier_hash")
					.select("nullifier")
					.eq("nullifier", nullifierHash)

				if (errorNullifierHash) {
					console.log(errorNullifierHash)
				}

				if (!nullifier) {
					console.log("Wrong nullifier")
				} else if (nullifier.length > 0) {
					console.log("You are using the same nullifier twice")
				}

				const { error: errorNullifier } = await supabase
					.from("nullifier_hash")
					.insert([{ nullifier: nullifierHash }])

				if (errorNullifier) {
					console.error(errorNullifier)
				}

				const { data: dataFeedback, error: errorFeedback } = await supabase
					.from("feedback")
					.insert([{ signal: schemaData }])
					.select()
					.order("created_at", { ascending: false })

				if (errorFeedback) {
					console.error(errorFeedback)
				}

				if (!dataFeedback) {
					console.error("Wrong dataFeedback")
				}

				// TODO everything is good so add the proof in attestation : Mahdi
			}

			const encodedData = schemaEncoder.encodeData(schemaData);

			const prevAttestations = await getPrevAttestationIds(
				address,
				SCHEMA_UID,
				easConfig.gqlUrl,
				ranking.name,
			);

			if (prevAttestations.length > 0) {
				for (const id of prevAttestations) {
					const revokedTransactions = await eas.revoke({
						schema: SCHEMA_UID,
						data: { uid: id },
					});
					await revokedTransactions.wait();
				}
			}

			const tx = await eas.attest({
				schema: SCHEMA_UID,
				data: {
					data: encodedData,
					recipient: address,
					revocable: true,
				},
			});

			const newAttestationUID = await tx.wait();

			console.log('attestaion id', newAttestationUID);
			// await finishCollections(collectionId);
			await axios.post('/flow/reportAttest', {
				cid: ranking.id,
			});

			router.push(
				`${Routes.Categories}/${category?.data.collection?.id}/pairwise-ranking/done`,
			);
		} catch (e) {
			console.error('error on sending tx:', e);
		} finally {
			setAttestUnderway(false);
		}
	};

	if (isCategoryLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='relative flex min-h-[calc(100dvh)] flex-col '>
			<div className='flex flex-grow flex-col'>
				<TopRouteIndicator name={category?.data.collection?.name} />
				<div className='pb-8 pt-6'>
					<CategoryItem
						category={category?.data.collection!}
						// @ts-ignore
						progress={category?.data.progress}
					/>
				</div>
				<div className='mx-4'>
					<label className='block text-sm font-medium text-gray-700'>
						Add comment
					</label>
					<textarea
						value={comment}
						onChange={onCommentChange}
						placeholder='Add comments to describe reason for your voting and ranking.'
						className={`mt-1 block h-[100px] w-full resize-none rounded-md border border-gray-300 px-3 py-2 shadow-sm`}
					></textarea>
					<p
						className={`mt-2 text-sm ${commentError ? `text-red-500` : `text-gray-500`}`}
					>
						Min 100 characters
					</p>
				</div>
			</div>

			<div className='sticky bottom-0 w-full border-t border-gray-200 bg-white px-6 py-6'>
				<Button
					onClick={attest}
					disabled={isProjectsRankingLoading || attestUnderway}
					className='w-full bg-primary'
					isLoading={attestUnderway}
				>
					Submit Vote
				</Button>
			</div>
		</div>
	);
};

export default CategoryRankingComment;
