'use client';

import Button from '@/app/components/Button';
import Image from 'next/image';
import ConnectButton from './ConnectButton';

const ConnectHeader = () => {
	return (
		<header className='border-b border-gray-100 px-4 py-10 lg:px-20 lg:py-8'>
			<div className='flex items-center justify-between'>
				<Image
					src='/images/logos/logo-text.png'
					alt='logo'
					width={220}
					height={100}
				/>
				<ConnectButton />
			</div>
		</header>
	);
};

export default ConnectHeader;
