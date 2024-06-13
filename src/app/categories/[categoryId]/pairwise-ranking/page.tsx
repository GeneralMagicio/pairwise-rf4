'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import TopRouteIndicator from '@/app/components/TopRouteIndicator';
import ProgressBar from '@/app/components/ProgressBar';
import { useGetPairwisePairs } from '@/app/features/categories/getPairwisePairs';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useCategoryById } from '@/app/features/categories/getCategoryById';
import { useUpdateProjectVote } from '@/app/features/categories/updateProjectVote';
import { Routes } from '@/app/constants/Routes';
import Image from 'next/image';

import { useUpdatePairwiseFinish } from '@/app/features/categories/updatePairwiseFinish';
import CategoryPairwiseCardWithMetrics from '../../components/CategoryPairwiseCardWithMetrics';
import {
	compareProjects,
	ComparisonResult,
	processProjectMetricsCSV,
} from '@/utils/getMetrics';
import { cn } from '@/app/helpers/cn';
import { formatMetricsNumber } from '@/utils/numbers';

import { truncate } from '@/app/helpers/text-helpers';

interface IUserSeenRankingFinishedModal {
	value: string;
	categoryId: string;
}

const project1Id = 'UF36qYsUzfwX6GDNuWgpDXrqsmrLcK4Rw5D4hZY5Pxc=';
const project2Id = 'Q8XI5uvgwOT41A1eWKKVRoQdzjDvYXRtVLpT6n7KVrg=';

const CategoryPairwiseRankingPage = () => {
	const router = useRouter();
	const { categoryId } = useParams();

	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const [customLoading, setCustomLoading] = useState(false);

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

	const threshold = pairwisePairs?.data.threshold ?? 0;
	const votedPairs = pairwisePairs?.data.votedPairs ?? 0;
	const totalPairs = pairwisePairs?.data.totalPairs ?? 1;
	let progressPercentage = 0;

	if (totalPairs !== 0) {
		progressPercentage = (votedPairs / totalPairs / threshold) * 100;
	}

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
			progressPercentage >= 100 &&
			(!hasUserSeenRankingFinishedModal ||
				parsedData.categoryId !== selectedCategoryId ||
				parsedData.value !== 'true')
		) {
			setCustomLoading(true);
			finishRanking().then(() => {
				router.push(
					`${Routes.Categories}/${selectedCategoryId}/pairwise-ranking/ranking-done`,
				);
			});
		}
	}, [progressPercentage]);

	if (
		isCategoryLoading ||
		isPairwisePairsLoading ||
		!pairwisePairs?.data.pairs[0] ||
		customLoading
	) {
		return <LoadingSpinner />;
	}

	return (
		<div className='flex min-h-[calc(100dvh)] flex-col justify-between'>
			<div>
				<TopRouteIndicator name={categoryData?.data.collection.name} />
				<div className='mb-1 mt-6 px-8'>
					<ProgressBar
						progress={
							progressPercentage > 100 ? 100 : progressPercentage
						}
					/>
					<p className='mt-2 text-sm'>
						{progressPercentage > 100
							? 100
							: progressPercentage.toFixed(2)}
						% of 100% Projects ranked
					</p>
				</div>
				<p className='text-bold mb-4 mt-6 px-3 text-center text-base'>
					{`Which project should receive more RetroPGF funding in ${categoryData?.data.collection.name}?`}
				</p>
				<div className='items-top flex justify-between gap-4 pb-6'>
					<div
						key={firstProject.id}
						className={`${isLoading ? 'cursor-not-allowed opacity-50' : 'opacity-100'} cursor-pointer`}
					>
						<CategoryPairwiseCardWithMetrics
							project={firstProject}
						/>
					</div>
					<div
						key={secondProject.id}
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
					<div className='sticky bottom-5 px-6 py-6'>
						<div className='flex justify-between'>
							<div
								className={cn(
									'flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold shadow-md',
									{
										'cursor-not-allowed opacity-50':
											isLoading,
									},
								)}
								onClick={() => {
									console.log('Clicking on First', isLoading);
									!isLoading && handleVote(firstProject.id);
								}}
							>
								<div>
									{firstProject.image ? (
										<Image
											className='rounded-full'
											src={firstProject.image}
											alt='Logo'
											width={32}
											height={32}
										/>
									) : (
										<div className='relative h-[32px] w-[32px] rounded-full bg-gray-700'>
											<p className='absolute inset-0 flex items-center justify-center overflow-hidden px-1 text-center text-[4px] text-white'>
												{firstProject.name}
											</p>
										</div>
									)}
								</div>
								<div>{truncate(firstProject.name, 12)}</div>
							</div>
							<div
								className={cn(
									'flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold shadow-md',
									{
										'cursor-not-allowed opacity-50':
											isLoading,
									},
								)}
								onClick={() =>
									!isLoading && handleVote(secondProject.id)
								}
							>
								<div>
									{secondProject.image ? (
										<Image
											className='rounded-full'
											src={secondProject.image}
											alt='Logo'
											width={32}
											height={32}
										/>
									) : (
										<div className='relative h-[32px] w-[32px] rounded-full bg-gray-700'>
											<p className='absolute inset-0 flex items-center justify-center overflow-hidden px-1 text-center text-[4px] text-white'>
												{secondProject.name}
											</p>
										</div>
									)}
								</div>
								{truncate(secondProject.name, 12)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryPairwiseRankingPage;
