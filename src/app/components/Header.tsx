'use client';

import React, { useEffect } from 'react';
import Image from 'next/image'; // Make sure to install 'next/image'
import { useRouter } from 'next/navigation';
import { AdjacentBadges } from '../badges/components/AdjacentBadges';
import { useGetBadges, useGetIdentity } from '../features/badges/getBadges';
import { identityLsKey } from '../hooks/useCreateIdentity';
import { useConnect } from '../providers/ConnectProvider';

const Header = () => {
	const router = useRouter();
	const { data: badges } = useGetBadges();
	const { data: identity } = useGetIdentity();

	const { setIsConnectDrawerOpen } = useConnect();

	useEffect(() => {
		if (!identityLsKey) {
			console.error('Missing local storage tag');
			return;
		}

		if (identity)
			localStorage.setItem(identityLsKey, JSON.stringify(identity));
	}, [identity]);

	const hasConnected = badges && identity;

	return (
		<header className='sticky top-0 z-10 flex items-center justify-between border-b border-gray-300 bg-white p-4'>
			<div className='flex items-center cursor-pointer'>
				<Image
					src='/images/characters/welcome-character.png'
					alt='Logo'
					width={40}
					height={40}
				/>
			</div>
			{hasConnected ? (
				<div onClick={() => router.push('/badges')}>
					<AdjacentBadges {...badges} size={25} />
				</div>
			) : (
				<button
					onClick={() => setIsConnectDrawerOpen(true)}
					className='rounded-full bg-primary px-4 py-2 text-sm text-white'
				>
					Connect
				</button>
			)}
		</header>
	);
};

export default Header;
