'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import TopRouteIndicator from '@/app/components/TopRouteIndicator';
import CategoryPairwiseCard from '../../components/CategoryPairwiseCard';
import ProgressBar from '@/app/components/ProgressBar';
import { useGetPairwisePairs } from '@/app/features/categories/getPairwisePairs';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useCategoryById } from '@/app/features/categories/getCategoryById';
import { useUpdateProjectVote } from '@/app/features/categories/updateProjectVote';

const CategoryPairwiseRankingPage = () => {
	const { categoryId } = useParams();

	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const { mutateAsync, isPending: isVotingPending } = useUpdateProjectVote({
		categoryId: +selectedCategoryId,
	});

	const { data: categoryData, isLoading: isCategoryLoading } =
		useCategoryById(+selectedCategoryId);

	const {
		data: pairwisePairs,
		isLoading: isPairwisePairsLoading,
		isFetching: isFetchingPairwise,
	} = useGetPairwisePairs(+selectedCategoryId);

	const [firstProject, secondProject] = pairwisePairs?.data.pairs[0] ?? [];

	const currentPercentage =
		((pairwisePairs?.data.votedPairs ?? 0) /
			(pairwisePairs?.data.totalPairs ?? 1)) *
		100;

	if (isCategoryLoading || isPairwisePairsLoading) {
		return <LoadingSpinner />;
	}

	const handleVote = async (pickedId: number) => {
		await mutateAsync({
			data: {
				project1Id: firstProject.id,
				project2Id: secondProject.id,
				pickedId,
			},
		});
	};

	return (
		<div>
			<TopRouteIndicator name={categoryData?.data.collection.name} />
			<div className='mb-10 mt-6 px-8'>
				<ProgressBar progress={currentPercentage} />
				<p className='mt-2 text-sm'>
					{currentPercentage.toFixed(2)}% of 100% Projects ranked
				</p>
				<p>Voted {pairwisePairs?.data.votedPairs}</p>
				<p>Total {pairwisePairs?.data.totalPairs}</p>
			</div>
			<p className='text-bold mb-4 mt-6 px-3 text-center text-base'>
				{`Which project should receive more RetroPGF funding in ${categoryData?.data.collection.name}?`}
			</p>
			<div className='flex flex-col items-center justify-center gap-3'>
				<div onClick={() => handleVote(firstProject.id)}>
					<CategoryPairwiseCard project={firstProject} />
				</div>
				<div onClick={() => handleVote(secondProject.id)}>
					<CategoryPairwiseCard project={secondProject} />
				</div>
			</div>
		</div>
	);
};

export default CategoryPairwiseRankingPage;
