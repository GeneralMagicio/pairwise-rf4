'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { Categories, projects } from '../../mockData';
import TopRouteIndicator from '@/app/components/TopRouteIndicator';
import CategoryPairwiseCard from '../../components/CategoryPairwiseCard';
import ProgressBar from '@/app/components/ProgressBar';

const CategoryPairwiseRankingPage = () => {
	const { categoryId } = useParams();

	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const selectedCategory = Categories.find(
		category => category.id === +selectedCategoryId,
	);

	const categoryProjects = projects.filter(
		project => project.parentId === +selectedCategoryId,
	);
	return (
		<div>
			<TopRouteIndicator name={selectedCategory?.name} />
			<div className='mb-10 mt-6 px-8'>
				<ProgressBar progress={20} />
				<p className='mt-2 text-sm'>20% of 100% Projects ranked</p>
			</div>
			<p className='text-bold mb-4 mt-6 px-3 text-center text-base'>
				{`Which project should receive more RetroPGF funding in ${selectedCategory?.name}?`}
			</p>
			<div className='flex flex-col items-center justify-center gap-3'>
				<CategoryPairwiseCard project={categoryProjects[0]} />
				<CategoryPairwiseCard project={categoryProjects[1]} />
			</div>
		</div>
	);
};

export default CategoryPairwiseRankingPage;
