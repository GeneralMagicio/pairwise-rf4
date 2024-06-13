'use client';

import React, { ReactNode } from 'react';
import Button from '../components/Button';
import { useRouter } from 'next/navigation';
import { Routes } from '../constants/Routes';
import { captureEvent } from '@/utils/postHog';


const WelcomeLayout = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	captureEvent(localStorage.getItem("userId") || "null", 'Just Landed', { page: `/welcome`});
	return (
		<div className='centered-mobile-max-width flex min-h-[calc(100dvh)] flex-col'>
			<div className='flex flex-grow flex-col justify-center px-6'>
				{children}
			</div>
			<div className='w-full border-t-2 border-gray-200'></div>
			<div className='px-6 py-6'>
				<Button
					className='w-full bg-primary'
					onClick={() => router.push(Routes.Intro)}
				>
					Next
				</Button>
			</div>
		</div>
	);
};

export default WelcomeLayout;
