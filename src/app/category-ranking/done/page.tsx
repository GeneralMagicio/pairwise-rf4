'use client';

import React from 'react';
import Button from '@/app/components/Button';
import { Routes } from '@/app/constants/Routes';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import IconCheck from 'public/images/icons/IconCheck';

const CategoryRankingDone = () => {
	const router = useRouter();
	const { categoryId } = useParams();

	return (
		<div className='flex min-h-[calc(100dvh)] flex-col justify-between'>
			<div className='mx-auto flex h-[80vh] flex-col items-center justify-center gap-4'>
				<div className='inline-flex items-center justify-center rounded-full border-2 border-red-500 bg-red-200 p-2'>
					<IconCheck color='red' />
				</div>{' '}
				<p className='mx-auto text-lg font-bold'>Vote submitted</p>
				<p className='mx-auto text-ph'>
					Now you can go back and vote on another category.
				</p>
			</div>
			<div className='border-t border-t-gray-300 px-6 py-6'>
				<Button
					onClick={() =>
						router.push(
							`${Routes.Categories}`,
						)
					}
					className='w-full bg-primary'
				>
					Done
				</Button>
			</div>
		</div>
	);
};

export default CategoryRankingDone;
