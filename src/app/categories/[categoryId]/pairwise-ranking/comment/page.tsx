'use client';

import CategoryItem from '@/app/categories/components/CategoryItem';
import Button from '@/app/components/Button';
import LoadingSpinner, {
	ButtonLoadingSpinner,
} from '@/app/components/LoadingSpinner';
import TopRouteIndicator from '@/app/components/TopRouteIndicator';
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
import { useState } from 'react';
import AXIOS from 'axios';
import { axios } from '@/lib/axios';
import posthog from 'posthog-js';
// Bandada/Semaphore removed
import { activeChain } from '@/lib/third-web/constants';
import SubmittingVoteSpinner from '@/app/components/SubmittingVoteSpinner';
import VoteSubmitted from '@/app/components/VoteSubmitted';

const CategoryRankingComment = () => {
	const router = useRouter();
	const { categoryId } = useParams();
	const [voteSubmitted, setVoteSubmitted] = useState<boolean>(false);
	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const [comment, setComment] = useState('');
	const [commentIsLoading, setCommentIsLoading] = useState(false);
	const [attestUnderway, setAttestUnderway] = useState(false);

	const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	};

	const rephraseComment = async () => {
		setCommentIsLoading(true);
		try {
			const response = await AXIOS.get('/api/rephrase/', {
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

	const { data: category, isLoading: isCategoryLoading } =
		useCategoryById(+selectedCategoryId);

	const { data: rankingRes, isLoading: isProjectsRankingLoading } =
		useProjectsRankingByCategoryId(+selectedCategoryId);

	const ranking = rankingRes?.data;

	const attest = async () => {
		// Identity removed

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
				ranking.name,
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

			// zk-proof removed

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

			posthog.capture('Attested', {
				attestedCategory: category?.data.collection?.name,
			});

			console.log('attestaion id', newAttestationUID);
			// await finishCollections(collectionId);
			await axios.post('/flow/reportAttest', {
				cid: ranking.id,
			});

			setVoteSubmitted(true);
		} catch (e) {
			console.error('error on sending tx:', e);
		} finally {
			setAttestUnderway(false);
		}
	};

	if (isCategoryLoading) {
		return <LoadingSpinner />;
	}
	if (voteSubmitted) {
		return <VoteSubmitted categoryId={category?.data.collection?.id} />;
	}

	return (
		<div className='relative flex min-h-[calc(100dvh)] flex-col '>
			<div className='flex flex-grow flex-col gap-2'>
				<TopRouteIndicator
					name={category?.data.collection?.name}
					icon='arrow'
				/>
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
					disabled={isProjectsRankingLoading || attestUnderway}
					className='w-full bg-primary'
				>
					Submit Vote
				</Button>
				{attestUnderway ? <SubmittingVoteSpinner /> : <></>}
			</div>
		</div>
	);
};

export default CategoryRankingComment;
