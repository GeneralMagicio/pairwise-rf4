'use client';

import TopNavigation from '@/app/components/TopNavigation';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { Categories, projects } from '../mockData';
import { Routes } from '@/app/constants/Routes';
import CategoryBadge from '../components/CategoryBadge';
import CategoryProjectItem from '../components/CategoryProjectItem';
import Button from '@/app/components/Button';

import { useProjectsByCategoryId } from '@/app/features/categories/getProjectsByCategoryId';
import { useCategories } from '@/app/features/categories/getCategories';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useCategoryById } from '@/app/features/categories/getCategoryById';

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
	console.log('Data', selectedCategory);

	if (isProjectsLoading || isCategoryLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='flex min-h-screen flex-col  justify-between'>
			<div>
				<TopNavigation
					link={Routes.Categories}
					text={selectedCategory?.name}
				/>
				<div className='mt-6'>
					<div className='mx-4 flex justify-between'>
						<h1 className='text-xl font-bold'>
							{selectedCategory?.name}
						</h1>
						<CategoryBadge />
					</div>
					<div className='mx-4 my-4'>
						<p className='text-ph'>
							{selectedCategory?.impactDescription}
						</p>
					</div>
				</div>
				<p className='mx-4 font-bold text-gray-600'>
					Projects ({projects?.data?.length})
				</p>
				<div className='mt-2 '>
					{projects?.data?.map(project => (
						<CategoryProjectItem
							project={project}
							key={project.id}
						/>
					))}
				</div>
			</div>
			<div className='px-6 py-6'>
				<Button
					className='w-full bg-primary'
					onClick={() =>
						router.push(
							`${Routes.Categories}/${categoryId}/project-ranking`,
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
