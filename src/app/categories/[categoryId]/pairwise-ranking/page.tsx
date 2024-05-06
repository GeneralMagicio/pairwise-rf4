'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { Categories, projects } from '../../mockData';
import TopRouteIndicator from '@/app/components/TopRouteIndicator';
import CategoryPairwiseCard from '../../components/CategoryPairwiseCard';
import ProgressBar from '@/app/components/ProgressBar';
import { useGetPairwisePairs } from '@/app/features/categories/getPairwisePairs';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useCategoryById } from '@/app/features/categories/getCategoryById';

const CategoryPairwiseRankingPage = () => {
	const { categoryId } = useParams();

	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const { data: categoryData, isLoading: isCategoryLoading } =
		useCategoryById(+selectedCategoryId);

	const { data: pairwisePairs, isLoading: isPairwisePairsLoading } =
		useGetPairwisePairs(+selectedCategoryId);

	const [firstProject, secondProject] = pairwisePairs?.data.pairs[0] ?? [];

	if (isCategoryLoading || isPairwisePairsLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div>
			<TopRouteIndicator name={categoryData?.data.collection.name} />
			<div className='mb-10 mt-6 px-8'>
				<ProgressBar progress={20} />
				<p className='mt-2 text-sm'>20% of 100% Projects ranked</p>
			</div>
			<p className='text-bold mb-4 mt-6 px-3 text-center text-base'>
				{`Which project should receive more RetroPGF funding in ${categoryData?.data.collection.name}?`}
			</p>
			<div className='flex flex-col items-center justify-center gap-3'>
				<CategoryPairwiseCard project={firstProject} />
				<CategoryPairwiseCard project={secondProject} />
			</div>
		</div>
	);
};

export default CategoryPairwiseRankingPage;
