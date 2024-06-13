'use client';

import TopNavigation from '@/app/components/TopNavigation';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Routes } from '@/app/constants/Routes';
import CategoryBadge from '../components/CategoryBadge';
import CategoryProjectItem from '../components/CategoryProjectItem';
import Button from '@/app/components/Button';
import { useProjectsByCategoryId } from '@/app/features/categories/getProjectsByCategoryId';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useCategoryById } from '@/app/features/categories/getCategoryById';
import { truncate } from '@/app/helpers/text-helpers';
import posthog from 'posthog-js';

const CategoryPage = () => {
	const router = useRouter();
	const { categoryId } = useParams();

	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];
	const { data: projects, isLoading: isProjectsLoading } =
		useProjectsByCategoryId(+selectedCategoryId);

	const { data, isLoading: isCategoryLoading } =
		useCategoryById(+selectedCategoryId);

	const selectedCategory = data?.data?.collection;
	const selectedCategoryProgress = data?.data.progress;

	if (isProjectsLoading || isCategoryLoading) {
		return <LoadingSpinner />;
	}else{
		posthog.capture('User goes to the Categories page', {categoryName:`${selectedCategory?.name}`});
	}

	return (
		<div className='flex min-h-[calc(100dvh)] flex-col  justify-between'>
			<div>
				<TopNavigation
					link={Routes.Categories}
					text={selectedCategory?.name}
				/>
				<div className='mt-6'>
					<div className='mx-4 flex items-center justify-between'>
						<h1 className='text-xl font-bold'>
							{selectedCategory?.name}
						</h1>
						<CategoryBadge progress={selectedCategoryProgress} />
					</div>
					<div className='mx-4 my-4'>
						<p className='text-ph'>
							{truncate(
								selectedCategory?.impactDescription || '',
								400,
							)}
						</p>
					</div>
				</div>
				<p className='mx-4 my-4 font-bold text-red-800'>
					Important: You must at least choose 2 projects.
				</p>
				<p className='mx-4 font-bold text-gray-600'>
					Projects ({projects?.data?.length})
				</p>
				<div className='mt-2'>
					{projects?.data?.map(project => (
						<div key={project.id}>
							<CategoryProjectItem project={project} />
						</div>
					))}
				</div>
			</div>
			<div className='px-6 py-6'>
				<Button
					className='w-full bg-primary'
					onClick={() =>
						router.push(
							`${Routes.Categories}/${categoryId}/filter-guide`,
						)
					}
				>
					Start
				</Button>
			</div>
		</div>
	);
};

export default CategoryPage;
