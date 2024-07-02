'use client';

import Image from 'next/image'; // Make sure to install 'next/image'
import { CollectionProgressStatus, ICategory } from '../types';
import { useRouter } from 'next/navigation';
import { Routes } from '@/app/constants/Routes';
import CategoryBadge from './CategoryBadge';
import { truncate } from '@/app/helpers/text-helpers';
import { useGetBadges, useGetIdentity } from '@/app/features/badges/getBadges';
import { useConnect } from '@/app/providers/ConnectProvider';
import { useAccount } from 'wagmi';

export interface ICategoryProps {
	category: ICategory;
	progress?: CollectionProgressStatus;
	imageNumber?: number;
}

const CategoryItem = ({ category, progress, imageNumber }: ICategoryProps) => {
	const router = useRouter();

	const { data: badges } = useGetBadges();
	const { data: identity } = useGetIdentity();

	const { handleConnect, setIsConnectDrawerOpen } = useConnect();
	const { isConnected } = useAccount();

	const imgNumber = imageNumber || (category.id % 5) + 1;
	const imgSrc = `/images/defaults/category/category-${imgNumber}.png`;
	const onCategoryClick = () => {
		if (progress) return null;
		switch (category.progress) {
			case 'Filtered':
				router.push(
					`${Routes.Categories}/${category.id}/project-ranking/summary`,
				);
				break;
			case 'Filtering':
				router.push(
					`${Routes.Categories}/${category.id}/project-ranking`,
				);
				break;
			case 'Finished':
				router.push(
					`${Routes.Categories}/${category.id}/pairwise-ranking/ranking-list`,
				);
				break;
			case 'Attested':
				router.push(
					`${Routes.Categories}/${category.id}/pairwise-ranking/done`,
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

	const checkConnectionThenRedirect = () => {
		if (badges && identity) {
			onCategoryClick();
		} else if (!isConnected) {
			setIsConnectDrawerOpen(true);
		} else {
			handleConnect();
		}
	};

	return (
		<div
			className='flex cursor-pointer items-center justify-between gap-2 border-b border-b-gray-300 py-3 px-3'
			onClick={checkConnectionThenRedirect}
		>
			<div className='relative'>
				<Image
					className='rounded-full'
					src={imgSrc}
					alt='Logo'
					width={40}
					height={40}
				/>
				<p className='absolute inset-0 flex items-center justify-center px-1 text-center text-[4px] text-white'>
					{category.name}
				</p>
			</div>
			<div className='flex flex-1 flex-col'>
				<p className='font-bold'>{category.name}</p>
				<p className=' text-ph self-stretch text-text-placeholder font-inter text-sm font-normal leading-[18px] tracking-[-0.011px]'>
					{truncate(category.impactDescription, 70)}
				</p>
			</div>
			<CategoryBadge progress={category.progress || progress} />
		</div>
	);
};

export default CategoryItem;
