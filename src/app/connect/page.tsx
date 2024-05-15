import Image from 'next/image';
import { PwLogo } from 'public/images/icons/PwLogo';
import React from 'react';

const ConnectHomePage = () => {
	return (
		<div className='centered-mobile-max-width mt-7'>
			<div className='text-center'>
				<Image
					src={'/images/characters/connect-home-character.png'}
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
			</div>
		</div>
	);
};

export default ConnectHomePage;
