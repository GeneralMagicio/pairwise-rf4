import React from 'react';
import { ICategoryProps } from './CategoryItem';
import Image from 'next/image';
import CategoryBadge from './CategoryBadge';
import { truncate } from '@/app/helpers/text-helpers';

const CategoryCard = ({ category, progress, imageNumber }: ICategoryProps) => {
	const imgNumber = imageNumber || (category.id % 5) + 1;
	const imgSrc = `/images/defaults/category/category-${imgNumber}.png`;

	return (
		<div className='mx-auto rounded-xl p-2 shadow-lg'>
			<div className='flex flex-col items-center gap-2'>
				<div className='relative'>
					<Image
						src={imgSrc}
						width={160}
						height={160}
						alt='category-image'
					/>
					<p className='absolute inset-0 flex items-center justify-center px-1 text-center text-sm font-bold text-white'>
						{category.name}
					</p>
				</div>
				<div className='flex w-full justify-start'>
					<CategoryBadge progress={category.progress || progress} />
				</div>{' '}
				<p className='text-left font-bold'>{category.name}</p>
				<p className='text-left text-ph'>
					{truncate(category.impactDescription, 50)}
				</p>
			</div>
		</div>
	);
};

export default CategoryCard;
