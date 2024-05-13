import React from 'react';

// onClick={() =>
//     router.push(
//         `${Routes.Categories}/${categoryId}/project-ranking`,
//     )
// }

const FilterGuidePage = () => {
	return (
		<div className='mt-28'>
			<div className='text-center'>
				<p className='text-2xl font-extrabold'>Project filtering</p>
				<p className='mb-6 mt-4 text-ph'>
					Start by selecting projects you want to keep or dismiss from
					this category.
				</p>
			</div>
		</div>
	);
};

export default FilterGuidePage;
