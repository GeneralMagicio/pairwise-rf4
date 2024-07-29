'use client';

import Image from 'next/image';
import { BandadaLogo } from 'public/images/icons/BandadaLogo';
import React from 'react';
import { useAccount } from 'wagmi';
import { Routes } from '../constants/Routes';
import { useRouter } from 'next/navigation';
import ConnectSplashMessage from './components/ConnectSplashMessage';

const steps = [
	{
		title: 'Go to Pairwise voting app',
		description: 'Get the code from Pairwise connect modal',
	},
	{ title: 'Sign', description: 'Sign with your connected wallet' },
	{
		title: 'Connect your OP Account',
		description:
			'Success! Your OP account is now secretly connected to the account you will vote with on Pairwise',
	},
];

const ConnectHomePage = () => {
	const { isConnected } = useAccount();
	const router = useRouter();

	const handleNavigation = () => {
		const currentParams = new URLSearchParams(window.location.search);

		router.push(`${Routes.ConnectOtp}?${currentParams.toString()}`);
	};

	return (
		<div className='centered-mobile-max-width mt-7'>
			<ConnectSplashMessage />
			<div className='text-center'>
				<Image
					src={'/images/characters/31.png'}
					width={220}
					height={100}
					alt='logo'
					className='mx-auto'
				/>
				<div className='mb-3 mt-4 text-2xl font-bold lg:text-3xl'>
					<p>Connect your OP Account</p>
					<p className='text-primary'>Pseudonymously</p>
				</div>
				<p className='mb-6'>Secured by zk-proof technology</p>
				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm'>Powered by</span>
					<BandadaLogo />
				</div>
				<div className='mx-auto max-w-[343px]'>
					{steps.map((step, index) => (
						<div
							key={index}
							className='mb-8 flex items-start gap-4'
						>
							<div className='flex-shrink-0'>
								<div className='relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200'>
									<span className='absolute inline-block h-3 w-3 rounded-full bg-gray-300'></span>
								</div>
							</div>
							<div>
								<h3 className='text-left text-lg font-semibold'>
									{step.title}
								</h3>
								<p className='text-left text-gray-600'>
									{step.description}
								</p>
							</div>
						</div>
					))}
					<button
						onClick={handleNavigation}
						disabled={!isConnected}
						className='mx-auto w-full bg-primary py-2 text-white disabled:bg-gray-100 disabled:text-gray-700'
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConnectHomePage;
