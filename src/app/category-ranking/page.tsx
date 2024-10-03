'use client';

import React, { useEffect } from 'react';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useGetCategoryPairs } from '../features/categories/getCategoryPairs';
import CategoryPairwiseCard from '../categories/components/CategoryPairwiseCard';
import { useUpdateCategoryVote } from '../features/categories/updateCategoryVote';
import TopRouteIndicator from '../components/TopRouteIndicator';
import { useRouter } from 'next/navigation';

const CategoryPairwiseRankingPage = () => {
	const router = useRouter();

	const { mutate, isPending: isVotingPending } = useUpdateCategoryVote();

	const {
		data: pairwisePairs,
		isLoading: isPairwisePairsLoading,
		isFetching: isFetchingPairwise,
	} = useGetCategoryPairs();
	console.log('PairwiseData', pairwisePairs);

	const [firstCategory, secondCategory] = pairwisePairs ?? [];

	useEffect(() => {
		if (pairwisePairs?.length === 0)
			router.push('/category-ranking/comment');
	}, [pairwisePairs, router]);

	const isLoading = false;
	const handleVote = async (pickedId: number) => {
		mutate({
			data: {
				collection1Id: firstCategory.id,
				collection2Id: secondCategory.id,
				pickedId,
			},
		});
	};

	if (isPairwisePairsLoading || pairwisePairs?.length === 0) {
		return <LoadingSpinner />;
	}

	return (
		<div className='flex min-h-[calc(100dvh)] flex-col justify-between'>
			<div>
				<TopRouteIndicator name={'Category Voting'} icon={'cross'} />
				<p className='text-bold mb-4 mt-6 px-3 text-center text-base'>
					{`Which category should receive more RetroPGF funding?`}
				</p>
				<div className='flex flex-col items-center justify-center gap-3'>
					<div
						key={firstCategory.id}
						onClick={() => {
							console.log('Clicking on First', isLoading);
							!isLoading && handleVote(firstCategory.id);
						}}
						className={`${isLoading ? 'cursor-not-allowed opacity-50' : 'opacity-100'} cursor-pointer`}
					>
						<CategoryPairwiseCard project={firstCategory} />
					</div>
					<div
						key={secondCategory.id}
						onClick={() =>
							!isLoading && handleVote(secondCategory.id)
						}
						className={`${isLoading ? 'cursor-not-allowed opacity-50' : 'opacity-100'} cursor-pointer`}
					>
						<CategoryPairwiseCard project={secondCategory} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryPairwiseRankingPage;
