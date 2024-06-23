'use client';

import Image from 'next/image'; // Make sure to install 'next/image'
import { ICategory } from '../types';
import CategoryBadge from './CategoryBadge';
import { truncate } from '@/app/helpers/text-helpers';

interface ICategoryProps {
	category: ICategory;
}

const CategoryRankingItem = ({ category }: ICategoryProps) => {

	return (
		<div
			className='flex cursor-pointer items-center justify-between gap-2 border-b border-b-gray-300 py-3 px-2'
		>
			<Image
				className='rounded-full'
				src={
					category.image && category.image !== ''
						? category.image
						: '/images/characters/welcome-character.png'
				}
				alt='Logo'
				width={40}
				height={40}
			/>
			<div className='flex flex-1 flex-col'>
				<p className='font-bold'>{category.name}</p>
				<p className='text-ph'>
					{truncate(category.impactDescription, 55)}
				</p>
			</div>
			<CategoryBadge progress={"Attested"} />
		</div>
	);
};

export default CategoryRankingItem;
