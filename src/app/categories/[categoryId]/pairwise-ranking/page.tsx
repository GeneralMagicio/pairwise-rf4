'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import TopRouteIndicator from '@/app/components/TopRouteIndicator';
import CategoryPairwiseCard from '../../components/CategoryPairwiseCard';
import ProgressBar from '@/app/components/ProgressBar';
import { useGetPairwisePairs } from '@/app/features/categories/getPairwisePairs';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useCategoryById } from '@/app/features/categories/getCategoryById';
import { useUpdateProjectVote } from '@/app/features/categories/updateProjectVote';
import { Routes } from '@/app/constants/Routes';
import Button from '@/app/components/Button';
import Modal from '@/app/components/Modal';
import { useUpdatePairwiseFinish } from '@/app/features/categories/updatePairwiseFinish';
import CategoryPairwiseCardWithMetrics from '../../components/CategoryPairwiseCardWithMetrics';
import {
	CategoryMetricData,
	compareProjects,
	ComparisonResult,
	processProjectMetricsCSV,
} from '@/utils/getMetrics';
import { cn } from '@/app/helpers/cn';
import { formatMetricsNumber } from '@/utils/numbers';

interface IUserSeenRankingFinishedModal {
	value: string;
	categoryId: string;
}

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

const project1Id = 'UF36qYsUzfwX6GDNuWgpDXrqsmrLcK4Rw5D4hZY5Pxc=';
const project2Id = 'Q8XI5uvgwOT41A1eWKKVRoQdzjDvYXRtVLpT6n7KVrg=';

const CategoryPairwiseRankingPage = () => {
	const router = useRouter();
	const { categoryId } = useParams();

	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [formattedMetrics, setFormattedMetrics] =
		useState<ComparisonResult>();

	const { mutate, isPending: isVotingPending } = useUpdateProjectVote({
		categoryId: +selectedCategoryId,
	});

	const { data: categoryData, isLoading: isCategoryLoading } =
		useCategoryById(+selectedCategoryId);

	const {
		data: pairwisePairs,
		isLoading: isPairwisePairsLoading,
		isFetching: isFetchingPairwise,
	} = useGetPairwisePairs(+selectedCategoryId);
	console.log('PairwiseData', pairwisePairs);
	const [firstProject, secondProject] = pairwisePairs?.data.pairs[0] ?? [];

	const currentPercentage =
		((pairwisePairs?.data.votedPairs ?? 0) /
			(pairwisePairs?.data.totalPairs ?? 1)) *
		100;
	const thresholdPercentage = pairwisePairs?.data.threshold
		? +pairwisePairs?.data.threshold * 100
		: 100;

	const handleVote = async (pickedId: number) => {
		mutate({
			data: {
				project1Id: firstProject.id,
				project2Id: secondProject.id,
				pickedId,
			},
		});
	};

	const { mutateAsync: finishRankingMutation, isPending } =
		useUpdatePairwiseFinish();

	const finishRanking = async () => {
		await finishRankingMutation({ data: { cid: +selectedCategoryId } });
	};

	const isLoading = isVotingPending || isFetchingPairwise;

	const userSawModal = () => {
		localStorage.setItem(
			'hasUserSeenRankingFinishedModal',
			JSON.stringify({
				value: 'true',
				categoryId: selectedCategoryId,
			}),
		);
	};

	const fetchMetrics = async () => {
		try {
			const response = await fetch('/data/cleaned_metrics.csv');
			const data = await response.text();
			const processedMap = processProjectMetricsCSV(data);
			const formatted = compareProjects(
				processedMap,
				project1Id,
				project2Id,
			);
			setFormattedMetrics(formatted);
			console.log('compareProjects', formatted);
		} catch (error) {
			console.error('Failed to load or process CSV', error);
		}
	};

	useEffect(() => {
		fetchMetrics();
	}, []);

	useEffect(() => {
		const hasUserSeenRankingFinishedModal = localStorage.getItem(
			'hasUserSeenRankingFinishedModal',
		);

		const parsedData: IUserSeenRankingFinishedModal = JSON.parse(
			hasUserSeenRankingFinishedModal || '{}',
		);

		if (
			currentPercentage > thresholdPercentage &&
			(!hasUserSeenRankingFinishedModal ||
				parsedData.categoryId !== selectedCategoryId ||
				parsedData.value !== 'true')
		) {
			setIsModalOpen(true);
		}
	}, [currentPercentage]);

	useEffect(() => {
		//If the user has voted all the pairs, redirect to the ranking list
		if (
			pairwisePairs?.data &&
			pairwisePairs?.data.votedPairs === pairwisePairs?.data.totalPairs
		) {
			console.log(
				'My Log',
				pairwisePairs?.data.totalPairs,
				pairwisePairs?.data.totalPairs,
			);

			router.push(
				`${Routes.Categories}/${selectedCategoryId}/pairwise-ranking/ranking-done`,
			);
		}
	}, [pairwisePairs?.data]);

	if (
		isCategoryLoading ||
		isPairwisePairsLoading ||
		!pairwisePairs?.data.pairs[0]
	) {
		return <LoadingSpinner />;
	}

	return (
		<div className='flex min-h-[calc(100dvh)] flex-col justify-between'>
			<div>
				<TopRouteIndicator name={categoryData?.data.collection.name} />
				<div className='mb-1 mt-6 px-8'>
					<ProgressBar progress={currentPercentage} />
					<p className='mt-2 text-sm'>
						{currentPercentage.toFixed(2)}% of 100% Projects ranked
					</p>
					{/* <p>Voted {pairwisePairs?.data.votedPairs}</p>
				<p>Total {pairwisePairs?.data.totalPairs}</p>
				<p>Total {pairwisePairs?.data.threshold}</p> */}
				</div>
				<p className='text-bold mb-4 mt-6 px-3 text-center text-base'>
					{`Which project should receive more RetroPGF funding in ${categoryData?.data.collection.name}?`}
				</p>
				<div className='items-top flex justify-between gap-4 pb-6'>
					<div
						key={firstProject.id}
						onClick={() => {
							console.log('Clicking on First', isLoading);
							!isLoading && handleVote(firstProject.id);
						}}
						className={`${isLoading ? 'cursor-not-allowed opacity-50' : 'opacity-100'} cursor-pointer`}
					>
						<CategoryPairwiseCardWithMetrics
							project={firstProject}
						/>
					</div>
					<div
						key={secondProject.id}
						onClick={() =>
							!isLoading && handleVote(secondProject.id)
						}
						className={`${isLoading ? 'cursor-not-allowed opacity-50' : 'opacity-100'} cursor-pointer`}
					>
						<CategoryPairwiseCardWithMetrics
							project={secondProject}
						/>
					</div>
				</div>
				<div>
					{formattedMetrics && (
						<div>
							{Object.keys(formattedMetrics).map(categoryKey => {
								const categoryMetrics =
									formattedMetrics[
										categoryKey as keyof typeof formattedMetrics
									];
								return (
									<div
										className='my-2 flex flex-col p-3'
										key={categoryKey}
									>
										<h3 className='pb-2 text-center font-bold'>
											{categoryKey}
										</h3>
										{Object.keys(categoryMetrics).map(
											metricKey => {
												const metric =
													categoryMetrics[
														metricKey as keyof typeof categoryMetrics
													];
												return (
													<div
														key={metricKey}
														className='flex justify-between gap-2 border-b-2 border-gray-200 py-2 last:border-b-0'
													>
														{/* <p className='font-medium'> */}
														<p
															className={cn(
																metric.value1 >
																	metric.value2
																	? 'font-semibold text-green-600'
																	: 'text-ph',
															)}
														>
															{formatMetricsNumber(
																metric.value1,
															) ?? '--'}
														</p>
														<p className='flex-grow text-center text-ph'>
															{metric.description}
														</p>
														<p
															className={cn(
																metric.value2 >
																	metric.value1
																	? 'font-semibold text-green-600'
																	: 'text-ph',
															)}
														>
															{formatMetricsNumber(
																metric.value2,
															) ?? '--'}
														</p>
													</div>
												);
											},
										)}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
			{currentPercentage > thresholdPercentage ? (
				<div className='border-t border-t-gray-300 px-6 py-6'>
					<Button
						onClick={async () => {
							await finishRanking();
							router.push(
								`${Routes.Categories}/${selectedCategoryId}/pairwise-ranking/ranking-done`,
							);
						}}
						className='w-full bg-primary'
						isLoading={isPending}
					>
						Finish Ranking
					</Button>
				</div>
			) : (
				<div></div>
			)}
			<Modal
				isOpen={isModalOpen}
				onClose={() => {
					userSawModal();
					setIsModalOpen(false);
				}}
			>
				<div className='p-5'>
					<p className='mb-4 text-center font-bold'>
						You voted on the minimum amount of projects, but you can
						continue for even better results!
					</p>
					<p className='mb-6 text-center text-ph'>
						For best results continue voting on more projects. Some
						projects may appear again, but that’s normal.
					</p>
					<Button
						onClick={() => {
							userSawModal();
							setIsModalOpen(false);
						}}
						className='mb-5 w-full bg-primary'
					>
						Continue ranking
					</Button>
					<Button
						onClick={async () => {
							await finishRanking();
							userSawModal();
							router.push(
								`${Routes.Categories}/${selectedCategoryId}/pairwise-ranking/ranking-done`,
							);
						}}
						isLoading={isPending}
						className='w-full border border-gray-200 text-black shadow-md'
					>
						Finish Ranking
					</Button>
				</div>
			</Modal>
		</div>
	);
};

export default CategoryPairwiseRankingPage;
