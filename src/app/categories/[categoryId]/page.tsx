'use client';

import TopNavigation from '@/app/components/TopNavigation';
import { useParams } from 'next/navigation';
import React from 'react';
import { Categories, projects } from '../mockData';
import { Routes } from '@/app/constants/Routes';
import CategoryBadge from '../components/CategoryBadge';
import CategoryProjectItem from '../components/CategoryProjectItem';

const CategoryPage = () => {
	const { categoryId } = useParams();
	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];
	console.log(categoryId);
	const selectedCategory = Categories.find(
		category => category.id === +selectedCategoryId,
	);
	console.log('selected', selectedCategory);
	const categoryProjects = projects.filter(
		project => project.parentId === +selectedCategoryId,
	);
	console.log('projects', categoryProjects);
	return (
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
				Projects ({categoryProjects.length})
			</p>
			<div className='mt-2 '>
				{categoryProjects.map(project => (
					<CategoryProjectItem project={project} key={project.id} />
				))}
			</div>
		</div>
	);
};

export default CategoryPage;
