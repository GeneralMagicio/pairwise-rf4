'use client';

import React from 'react';
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

const CategoryCardView = ({
	category,
	progress,
	imageNumber,
}: ICategoryProps) => {
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
			className=' mx-auto cursor-pointer rounded-xl bg-[#FBFCFE] p-2 shadow-lg '
			onClick={checkConnectionThenRedirect}
		>
			<div className=' '>
				<div className='flex flex-col items-center gap-2  rounded-xl '>
					<div className='relative'>
						<img
							className='object-fill'
							src={imgSrc}
							alt='Logo'
						></img>
						<p className='absolute inset-0 flex items-center justify-center px-1 text-center text-sm font-bold text-white'>
							{category.name}
						</p>
					</div>
					<div className='flex w-full justify-start'>
						<CategoryBadge
							progress={category.progress || progress}
						/>
					</div>{' '}
					<p className='flex w-full justify-start font-bold'>
						{category.name}
					</p>
					<p className='text-left text-ph'>
						{truncate(category.impactDescription, 50)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CategoryCardView;
