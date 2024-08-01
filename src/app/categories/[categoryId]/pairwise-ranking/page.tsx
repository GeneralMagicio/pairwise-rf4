'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import TopRouteIndicator from '@/app/components/TopRouteIndicator';
import ProgressBar from '@/app/components/ProgressBar';
import { useGetPairwisePairs } from '@/app/features/categories/getPairwisePairs';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useCategoryById } from '@/app/features/categories/getCategoryById';
import {
	useUpdateProjectUndo,
	useUpdateProjectVote,
} from '@/app/features/categories/updateProjectVote';
import { Routes } from '@/app/constants/Routes';

import { useUpdatePairwiseFinish } from '@/app/features/categories/updatePairwiseFinish';
import CategoryPairwiseCardWithMetrics from '../../components/CategoryPairwiseCardWithMetrics';
import { ComparisonResult } from '@/utils/getMetrics';
import { cn } from '@/app/helpers/cn';
import posthog from 'posthog-js';
import Drawer from '@/app/components/Drawer';
import { IProject } from '../../types';
import { DrawerContent } from '../../components/DrawerContent';

interface IUserSeenRankingFinishedModal {
	value: string;
	categoryId: string;
}

const CategoryPairwiseRankingPage = () => {
	const router = useRouter();
	const { categoryId } = useParams();

	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const [customLoading, setCustomLoading] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [drawerProject, setDrawerProject] = useState<IProject>();

	const toggleDrawer = (project: IProject) => {
		setIsDrawerOpen(prev => !prev);
		setDrawerProject(project);
	};

	const [formattedMetrics, setFormattedMetrics] =
		useState<ComparisonResult>();

	const { mutateAsync: voteMutateAsync, isPending: isVotingPending } =
		useUpdateProjectVote({
			categoryId: +selectedCategoryId,
		});

	const { mutateAsync: undoMutateAsync, isPending: isUndoPending } =
		useUpdateProjectUndo({
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
	const [firstProject, secondProject] = pairwisePairs?.data.pairs[0] || [];

	const threshold = pairwisePairs?.data.threshold ?? 0;
	const votedPairs = pairwisePairs?.data.votedPairs ?? 0;
	const totalPairs = pairwisePairs?.data.totalPairs ?? 1;
	let progressPercentage = 0;

	if (totalPairs !== 0) {
		progressPercentage = (votedPairs / totalPairs / threshold) * 100;
	}

	const handleVote = async (pickedId: number) => {
		posthog.capture('Comparing Projects', {
			categories: [firstProject.name, secondProject.name],
		});

		let selectedProject =
			firstProject.id == pickedId
				? firstProject.name
				: secondProject.name;
		posthog.capture('Selected Project for more Funding', {
			selectedProject: selectedProject,
		});
		await voteMutateAsync({
			data: {
				project1Id: firstProject.id,
				project2Id: secondProject.id,
				pickedId,
			},
		});
		// Scroll to the top of the page after voting
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleDraw = async (firstID: number, secondID: number) => {
		console.log('draw');
		await voteMutateAsync({
			data: {
				project1Id: firstID,
				project2Id: secondID,
				pickedId: null,
			},
		});

		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	const handleUndo = async () => {
		await undoMutateAsync(Number(selectedCategoryId));
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const { mutateAsync: finishRankingMutation, isPending } =
		useUpdatePairwiseFinish();

	const finishRanking = async () => {
		await finishRankingMutation({ data: { cid: +selectedCategoryId } });
	};

	const isLoading = isVotingPending || isFetchingPairwise;

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
		<div className='flex min-h-[calc(100dvh)] max-w-fit flex-col justify-between'>
			<div>
				<TopRouteIndicator
					name={categoryData?.data.collection.name}
					icon={'cross'}
				/>
				<div className='mb-1 mt-6 px-8'>
					<ProgressBar
						progress={
							progressPercentage > 100 ? 100 : progressPercentage
						}
						isMinGreater={true}
					/>
					<p className='mt-2 text-sm'>
						{progressPercentage > 100
							? 100
							: progressPercentage.toFixed(2)}
						% of 100% Projects ranked
					</p>
				</div>
				<p className='text-bold mb-4 mt-6 px-3 text-center text-base font-bold'>
					{`Which project should receive more RetroPGF funding in ${categoryData?.data.collection.name}?`}
				</p>
				<div className='items-top flex justify-between gap-4 pb-6 xxs:flex-col xs:flex-row'>
					<div
						key={firstProject.id}
						className={`${isLoading ? 'cursor-not-allowed opacity-50' : 'opacity-100'} cursor-pointer`}
					>
						<CategoryPairwiseCardWithMetrics
							project={firstProject}
							onClick={() =>
								!isLoading && handleVote(firstProject.id)
							}
							onInfoClick={() => toggleDrawer(firstProject)}
						/>
					</div>
					<div
						key={secondProject.id}
						className={`${isLoading ? 'cursor-not-allowed opacity-50' : 'opacity-100'} cursor-pointer`}
					>
						<CategoryPairwiseCardWithMetrics
							project={secondProject}
							onClick={() =>
								!isLoading && handleVote(secondProject.id)
							}
							onInfoClick={() => toggleDrawer(secondProject)}
						/>
					</div>
				</div>

				<Drawer setIsOpen={setIsDrawerOpen} isOpen={isDrawerOpen}>
					<DrawerContent project={drawerProject} />
				</Drawer>
				<div>
					<div className='sticky bottom-5 z-0 px-6 py-6'>
						<div className='absolute inset-0 bg-white bg-opacity-50'></div>{' '}
						<div className='relative z-10 flex justify-center  gap-10 xs:flex-row'>
							<div
								className={cn(
									'flex h-20 w-20  cursor-pointer items-center justify-center gap-2 rounded-full border bg-[#FEDF89] px-4 py-2 font-semibold opacity-100 shadow-md',
									{
										'cursor-not-allowed opacity-50':
											isLoading,
										' cursor-not-allowed opacity-50':
											votedPairs == 0 ? true : false,
									},
								)}
								onClick={() => {
									!isLoading && votedPairs == 0
										? false
										: true && handleUndo();
								}}
							>
								<div className=' flex flex-col items-center'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='25'
										height='24'
										viewBox='0 0 25 24'
										fill='none'
									>
										<path
											d='M2.5 10C2.5 10 4.50498 7.26822 6.13384 5.63824C7.76269 4.00827 10.0136 3 12.5 3C17.4706 3 21.5 7.02944 21.5 12C21.5 16.9706 17.4706 21 12.5 21C8.39691 21 4.93511 18.2543 3.85177 14.5M2.5 10V4M2.5 10H8.5'
											stroke='#DC6803'
											stroke-width='2'
											stroke-linecap='round'
											stroke-linejoin='round'
										/>
									</svg>
									<p className='text-xs'>Undo</p>
								</div>
							</div>
							<div
								className={cn(
									'flex h-20 w-20  cursor-pointer items-center justify-center gap-2 rounded-full border bg-[#DDD6FE] px-4 py-2 font-semibold shadow-md',
									{
										'cursor-not-allowed opacity-50':
											isLoading,
									},
								)}
								onClick={() => {
									!isLoading &&
										handleDraw(
											firstProject.id,
											secondProject.id,
										);
								}}
							>
								<div className='flex flex-col items-center'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='25'
										height='24'
										viewBox='0 0 25 24'
										fill='none'
									>
										<path
											d='M9.5 7L4.5 12L9.5 17M15.5 7L20.5 12L15.5 17'
											stroke='#7839EE'
											stroke-width='2'
											stroke-linecap='round'
											stroke-linejoin='round'
										/>
									</svg>
									<p className='text-xs'>Draw</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryPairwiseRankingPage;
