import React from 'react';
import CategoryItem from './components/CategoryItem';
import { Categories } from './mockData';

const CategoriesPage = () => {
	return (
		<div className='px-4'>
			<h1 className='mt-6 text-2xl font-bold'>Categories</h1>
			<p className='mb-6 text-ph '>Select one to begin ranking</p>
			{Categories.map(category => (
				<CategoryItem key={category.id} category={category} />
			))}
		</div>
	);
};

export default CategoriesPage;
