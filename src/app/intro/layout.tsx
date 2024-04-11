'use client';

import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import { Routes } from '../constants/Routes';

const IntroLayout = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	return (
		<div className='centered-mobile-max-width flex min-h-screen flex-col'>
			<div className='flex flex-grow flex-col justify-center px-6'>
				{children}
			</div>
			<div className='w-full border-t-2 border-gray-200'></div>
			<div className='px-6 py-6'>
				<Button
					onClick={() => router.push(Routes.Categories)}
					className='w-full bg-primary'
				>
					Let’s go!
				</Button>
			</div>
		</div>
	);
};

export default IntroLayout;
