'use client';

import React from 'react';
import CategoryItem from './components/CategoryItem';
import { useCategories } from '../features/categories/getCategories';
import LoadingSpinner from '../components/LoadingSpinner';

const CategoriesPage = () => {
	const { data: categories, isLoading } = useCategories();

	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div className='px-4'>
			<h1 className='mt-6 text-2xl font-bold'>Categories</h1>
			<p className='mb-6 text-ph '>Select one to begin ranking</p>
			{categories?.data?.map(category => (
				<CategoryItem key={category.id} category={category} />
			))}
		</div>
	);
};

export default CategoriesPage;
