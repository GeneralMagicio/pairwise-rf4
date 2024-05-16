'use client';

import Image from 'next/image';
import { PwLogo } from 'public/images/icons/PwLogo';
import React from 'react';

const steps = [
	{
		title: 'Go to Pairwise voting app',
		description: 'Get the code from Pairwise connect modal',
	},
	{
		title: 'Get the code & paste here',
		description: 'Paste code here to verify',
	},
	{ title: 'Sign', description: 'Sign with your connected wallet' },
	{
		title: 'Delegate your voting power',
		description: 'You have now successfully delegated your voting power',
	},
];

const ConnectHomePage = () => {
	return (
		<div className='centered-mobile-max-width mt-7'>
			<div className='text-center'>
				<Image
					src={'/images/characters/31.png'}
					width={220}
					height={100}
					alt='logo'
					className='mx-auto'
				/>
				<div className='mb-3 mt-4 text-2xl font-bold lg:text-3xl'>
					<p>Delegate your Voting Power</p>
					<p className='text-primary'>Anonymously</p>
				</div>
				<p className='mb-6'>Secured by zk-proof technology</p>
				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm'>Powered by</span>
					<PwLogo />
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
				</div>
			</div>
		</div>
	);
};

export default ConnectHomePage;
