'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Make sure to install 'next/image'
import Drawer from './Drawer';
import ConnectWalletContent from './ConnectWalletContent';
import CollectVotingPowerContent from './CollectVotingPowerContent';
import { useAccount } from 'wagmi';
import { badgesImages } from '../constants/BadgesData';
import { useRouter } from 'next/navigation';
import { Routes } from '../constants/Routes';
import { useQuery } from '@tanstack/react-query';
import { BadgeData } from '../badges/components/BadgeCard';
import { axios } from '@/lib/axios';
import { AdjacentBadges } from '../badges/components/AdjacentBadges';

const getBadges = async () => {
	const { data } = await axios.get<BadgeData>('/user/badges');
	return data;
};

const Header = () => {
	const router = useRouter();
	const { data: badges } = useQuery({
		queryKey: ['badges'],
		queryFn: getBadges,
	});

	const [isConnectDrawerOpen, setIsConnectDrawerOpen] = useState(false);
	const [isClaimDrawerOpen, setIsClaimDrawerOpen] = useState(false);
	const handleConnect = () => {
		setIsConnectDrawerOpen(false);
		setIsClaimDrawerOpen(true);
	};

	return (
		<header className='sticky top-0 z-10 flex items-center justify-between border-b border-gray-300 bg-white p-4'>
			<div className='flex items-center'>
				<Image
					src='/images/characters/welcome-character.png'
					alt='Logo'
					width={40}
					height={40}
				/>
			</div>
			{badges && Object.keys(badges).length > 0 ? (
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

			<Drawer
				setIsOpen={setIsConnectDrawerOpen}
				isOpen={isConnectDrawerOpen}
			>
				<ConnectWalletContent onConnect={handleConnect} />
			</Drawer>
			<Drawer setIsOpen={setIsClaimDrawerOpen} isOpen={isClaimDrawerOpen}>
				<CollectVotingPowerContent
					setIsClaimDrawerOpen={setIsClaimDrawerOpen}
				/>
			</Drawer>
		</header>
	);
};

export default Header;
