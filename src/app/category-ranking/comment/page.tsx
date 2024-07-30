'use client';

import CategoryRankingItem from '@/app/categories/components/CategoryRankingItem';
import Button from '@/app/components/Button';
import LoadingSpinner, {
	ButtonLoadingSpinner,
} from '@/app/components/LoadingSpinner';
import SubmittingVoteSpinner from '@/app/components/SubmittingVoteSpinner';
import TopRouteIndicator from '@/app/components/TopRouteIndicator';
import {
	getGroup,
	getMembersGroup,
} from '@/app/connect/anonvote/utils/bandadaApi';
import supabase from '@/app/connect/anonvote/utils/supabaseClient';
import { useCategoryRankings } from '@/app/features/categories/getCategoryRankings';
import { activeChain } from '@/lib/third-web/constants';
import {
	convertRankingToAttestationFormat,
	getPrevAttestationIds,
} from '@/utils/attest-utils';
import { useSigner, EASNetworks, SCHEMA_UID } from '@/utils/eas';
import {
	EAS,
	SchemaRegistry,
	SchemaEncoder,
} from '@ethereum-attestation-service/eas-sdk';
import { Group } from '@semaphore-protocol/group';
import { Identity } from '@semaphore-protocol/identity';
import { generateProof } from '@semaphore-protocol/proof';
import axios from 'axios';
import { encodeBytes32String, toBigInt } from 'ethers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useActiveWallet } from 'thirdweb/react';

const CategoryRankingComment = () => {
	const router = useRouter();

	const { data: ranking, isLoading } = useCategoryRankings();

	const [comment, setComment] = useState('');
	const [commentIsLoading, setCommentIsLoading] = useState(false);
	const [attestUnderway, setAttestUnderway] = useState(false);

	const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	};

	const rephraseComment = async () => {
		setCommentIsLoading(true);
		try {
			const response = await axios.get('/api/rephrase/', {
				params: { comment },
			});
			setComment(response.data.rephrasedText);
		} catch (error) {
			console.error('Error making GET request:', error);
		} finally {
			setCommentIsLoading(false);
		}
	};

	const wallet = useActiveWallet();
	const signer = useSigner();

	const attest = async () => {
		const localStorageTag = process.env.NEXT_PUBLIC_LOCAL_STORAGE_TAG!;
		const identityString = localStorage.getItem(localStorageTag);

		if (!identityString) {
			console.error('Identity string is missing!');
			router.push('/');
			return;
		}

		const identity = new Identity(identityString);

		if (!ranking) return;

		setAttestUnderway(true);

		const chainId = activeChain.id;
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
		let proof = [''];
		// setProgress(ProgressState.Creating);
		try {
			const item = await convertRankingToAttestationFormat(
				ranking.ranking,
				'Pairwise categories',
				comment,
			);

			const schemaData = [
				{ name: 'listName', type: 'string', value: item.listName },
				{
					name: 'listMetadataPtr',
					type: 'string',
					value: item.listMetadataPtr,
				},
			];

			const signalData = {
				category: item.listName,
				value: item.listMetadataPtr,
			};

			// generate proof of vote
			const groupId = process.env.NEXT_PUBLIC_BANDADA_GROUP_ID!;
			const users = await getMembersGroup(groupId);

			if (users && identityString !== '{}') {
				const bandadaGroup = await getGroup(groupId);
				let treeDepth = 16;
				if (bandadaGroup === null) {
					console.log('The Bandada group does not exist:', groupId);
				} else {
					treeDepth = bandadaGroup.treeDepth;
				}
				const group = new Group(groupId, treeDepth, users);
				console.log('going to encode signalData: ');
				console.log(signalData);
				const signal = toBigInt(
					encodeBytes32String(signalData.toString()),
				).toString();
				const {
					proof: tempProof,
					merkleTreeRoot,
					nullifierHash,
				} = await generateProof(identity, group, groupId, signal);
				console.log('generated proof of vote: ', proof);
				proof = tempProof;

				const { data: currentMerkleRoot, error: errorRootHistory } =
					await supabase
						.from('root_history')
						.select()
						.order('created_at', { ascending: false })
						.limit(1);

				if (errorRootHistory) {
					console.log(errorRootHistory);
				}

				if (!currentMerkleRoot) {
					console.error('Wrong currentMerkleRoot');
				}

				if (
					currentMerkleRoot == null ||
					merkleTreeRoot !== currentMerkleRoot[0].root
				) {
					// compare merkle tree roots
					const {
						data: dataMerkleTreeRoot,
						error: errorMerkleTreeRoot,
					} = await supabase
						.from('root_history')
						.select()
						.eq('root', merkleTreeRoot);

					if (errorMerkleTreeRoot) {
						console.log(errorMerkleTreeRoot);
					}

					console.log('merkleTreeRoot: ', merkleTreeRoot);
					console.log('dataMerkleTreeRoot: ', dataMerkleTreeRoot);

					if (!dataMerkleTreeRoot) {
						console.error('Wrong dataMerkleTreeRoot');
					} else if (dataMerkleTreeRoot.length === 0) {
						console.log('Merkle Root is not part of the group');
					}

					console.log('dataMerkleTreeRoot', dataMerkleTreeRoot);
					const merkleTreeRootDuration =
						bandadaGroup?.fingerprintDuration ?? 0;

					if (
						dataMerkleTreeRoot &&
						Date.now() >
							Date.parse(dataMerkleTreeRoot[0].created_at) +
								merkleTreeRootDuration
					) {
						console.log('Merkle Tree Root is expired');
					}
				}

				const { data: nullifier, error: errorNullifierHash } =
					await supabase
						.from('nullifier_hash')
						.select('nullifier')
						.eq('nullifier', nullifierHash);

				if (errorNullifierHash) {
					console.log(errorNullifierHash);
				}

				if (!nullifier) {
					console.log('Wrong nullifier');
				} else if (nullifier.length > 0) {
					console.log('You are using the same nullifier twice');
				}

				const { error: errorNullifier } = await supabase
					.from('nullifier_hash')
					.insert([{ nullifier: nullifierHash }]);

				if (errorNullifier) {
					console.error(errorNullifier);
				}

				const { data: dataFeedback, error: errorFeedback } =
					await supabase
						.from('feedback')
						.insert([{ signal: schemaData }])
						.select()
						.order('created_at', { ascending: false });

				if (errorFeedback) {
					console.error(errorFeedback);
				}

				if (!dataFeedback) {
					console.error('Wrong dataFeedback');
				}

				// TODO everything is good so add the proof in attestation : Mahdi
			}

			const schemaDataWithProof = [
				...schemaData,
				{
					name: 'proof',
					type: 'string[]',
					value: proof,
				},
			];

			console.log('sdwp', schemaDataWithProof);
			const encodedData = schemaEncoder.encodeData(schemaDataWithProof);

			const prevAttestations = await getPrevAttestationIds(
				address,
				SCHEMA_UID,
				easConfig.gqlUrl,
				'Pairwise categories',
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

			router.push(`/category-ranking/vote-submitted`);
		} catch (e) {
			console.error('error on sending tx:', e);
		}
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='relative flex min-h-[calc(100dvh)] flex-col'>
			<div className='flex flex-grow flex-col'>
				<TopRouteIndicator name={'Category Voting'} icon={'cross'} />
				<div className='pb-8 pt-6'>
					{ranking?.ranking.map(cat => (
						<CategoryRankingItem key={cat.id} category={cat} />
					))}
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
					<Button
						onClick={rephraseComment}
						className=' mt-4 w-full border border-primary '
					>
						{commentIsLoading ? (
							<div className='flex items-center justify-center'>
								<ButtonLoadingSpinner />
								<span className='font-sans text-base font-bold leading-5 text-primary'>
									Masking please wait...
								</span>
							</div>
						) : (
							<div className='flex items-center justify-center'>
								<img
									src={`/images/characters/${31}.png`}
									alt='Logo'
									width={25}
									height={25}
								/>
								<span className='font-sans text-base font-bold leading-5 text-primary'>
									Mask my writing style with AI
								</span>
							</div>
						)}
					</Button>
				</div>
			</div>

			<div className='sticky bottom-0 w-full border-t border-gray-200 bg-white px-6 py-6'>
				<Button
					onClick={attest}
					className='w-full bg-primary'
					disabled={isLoading || attestUnderway}
				>
					Submit Vote
				</Button>
				{attestUnderway ? <SubmittingVoteSpinner /> : <></>}
			</div>
		</div>
	);
};

export default CategoryRankingComment;
