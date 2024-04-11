import React from 'react';
import CategoryItem from './components/CategoryItem';

const page = () => {
	return (
		<div className='px-4'>
			<h1 className='mt-6 text-2xl font-bold'>Categories</h1>
			<p className='mb-6 text-ph '>Select one to begin ranking</p>
			<CategoryItem />
			<CategoryItem />
			<CategoryItem />
		</div>
	);
};

export default page;
