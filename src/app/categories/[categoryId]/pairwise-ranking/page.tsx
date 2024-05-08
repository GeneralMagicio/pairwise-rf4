'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import TopRouteIndicator from '@/app/components/TopRouteIndicator';
import CategoryPairwiseCard from '../../components/CategoryPairwiseCard';
import ProgressBar from '@/app/components/ProgressBar';
import { useGetPairwisePairs } from '@/app/features/categories/getPairwisePairs';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useCategoryById } from '@/app/features/categories/getCategoryById';
import { useUpdateProjectVote } from '@/app/features/categories/updateProjectVote';
import { Routes } from '@/app/constants/Routes';
import Button from '@/app/components/Button';

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

const CategoryPairwiseRankingPage = () => {
	const router = useRouter();
	const { categoryId } = useParams();

	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

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

	useEffect(() => {
		if (
			pairwisePairs?.data &&
			pairwisePairs?.data.votedPairs === pairwisePairs?.data.totalPairs
		) {
			console.log(
				'My Log',
				pairwisePairs?.data.totalPairs,
				pairwisePairs?.data.totalPairs,
			);
			//it should change
			router.push(
				`${Routes.Categories}/${selectedCategoryId}/pairwise-ranking/ranking-list`,
			);
		}
	}, [pairwisePairs?.data]);

	const isLoading = isVotingPending || isFetchingPairwise;

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
				<div className='flex flex-col items-center justify-center gap-3'>
					<div
						key={firstProject.id}
						onClick={() => {
							console.log('Clicking on First', isLoading);
							!isLoading && handleVote(firstProject.id);
						}}
						className={`${isLoading ? 'cursor-not-allowed opacity-50' : 'opacity-100'} cursor-pointer`}
					>
						<CategoryPairwiseCard project={firstProject} />
					</div>
					<div
						key={secondProject.id}
						onClick={() =>
							!isLoading && handleVote(secondProject.id)
						}
						className={`${isLoading ? 'cursor-not-allowed opacity-50' : 'opacity-100'} cursor-pointer`}
					>
						<CategoryPairwiseCard project={secondProject} />
					</div>
				</div>
			</div>
			{currentPercentage > thresholdPercentage ? (
				<div className='border-t border-t-gray-300 px-6 py-6'>
					<Button
						onClick={() => {
							router.push(
								`${Routes.Categories}/${selectedCategoryId}/pairwise-ranking/ranking-list`,
							);
						}}
						className='w-full bg-primary'
					>
						Finish Ranking
					</Button>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default CategoryPairwiseRankingPage;
