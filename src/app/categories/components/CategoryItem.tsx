'use client';

import Image from 'next/image'; // Make sure to install 'next/image'
import { ICategory } from '../types';
import { useRouter } from 'next/navigation';
import { Routes } from '@/app/constants/Routes';

interface ICategoryProps {
	category: ICategory;
}

const CategoryItem = ({ category }: ICategoryProps) => {
	const router = useRouter();

	return (
		<div
			className='flex cursor-pointer items-center justify-between gap-2 border-b border-b-gray-400 py-3'
			onClick={() => router.push(`${Routes.Categories}/${category.id}`)}
		>
			<Image
				src='/images/characters/welcome-character.png'
				alt='Logo'
				width={40}
				height={40}
			/>
			<div className='flex flex-1 flex-col'>
				<p className='font-bold'>{category.name}</p>
				<p className='text-ph'>{category.impactDescription}</p>
			</div>
			<div className='whitespace-nowrap rounded-full bg-gray-300 px-2 py-1'>
				Not ranked
			</div>
		</div>
	);
};

export default CategoryItem;
