'use client';

import Image from 'next/image'; // Make sure to install 'next/image'
import { ICategory } from '../types';
import { useRouter } from 'next/navigation';
import { Routes } from '@/app/constants/Routes';
import CategoryBadge from './CategoryBadge';
import { truncate } from '@/app/helpers/text-helpers';

interface ICategoryProps {
	category: ICategory;
}

const CategoryItem = ({ category }: ICategoryProps) => {
	const router = useRouter();

	const onCategoryClick = () => {
		switch (category.progress) {
			case 'Filtered':
				router.push(
					`${Routes.Categories}/${category.id}/project-ranking/summary`,
				);
				break;
			case 'Finished':
			case 'Attested':
				router.push(
					`${Routes.Categories}/${category.id}/project-ranking/summary`,
				);
				break;
			case 'WIP':
			case 'WIP - Threshold':
				router.push(
					`${Routes.Categories}/${category.id}/pairwise-ranking`,
				);
				break;
			default:
				router.push(`${Routes.Categories}/${category.id}`);
		}
	};

	return (
		<div
			className='flex cursor-pointer items-center justify-between gap-2 border-b border-b-gray-300 py-3'
			onClick={onCategoryClick}
		>
			<Image
				className='rounded-full'
				src={
					category.image !== ''
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
					{truncate(category.impactDescription, 70)}
				</p>
			</div>
			<CategoryBadge progress={category.progress} />
		</div>
	);
};

export default CategoryItem;
