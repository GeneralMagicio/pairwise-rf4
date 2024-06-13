'use client';

import Button from '@/app/components/Button';
import { Routes } from '@/app/constants/Routes';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const FilterGuidePage = () => {
	const router = useRouter();
	const { categoryId } = useParams();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className='mt-28 flex min-h-[calc(100dvh)] flex-col  justify-between'>
			<div className='text-center'>
				<p className='text-2xl font-extrabold'>Project filtering</p>
				<p className='mb-2 mt-4 text-ph'>
					Start by selecting projects you want to keep or dismiss from
					this category.
				</p>
				<div className='flex flex-col items-center justify-center'>
					<Image
						src='/images/filter-guide/1.png'
						width={300}
						height={300}
						alt='filter-guide'
					/>
					<Image
						src='/images/filter-guide/2.png'
						width={360}
						height={144}
						alt='filter-guide'
					/>
				</div>
			</div>
			<div className='sticky bottom-0 border-t border-b-gray-200 bg-white px-6 py-6'>
				<Button
					onClick={() =>
						router.push(
							`${Routes.Categories}/${categoryId}/project-ranking`,
						)
					}
					className='w-full bg-primary'
				>
					Got it!
				</Button>
			</div>
		</div>
	);
};

export default FilterGuidePage;
