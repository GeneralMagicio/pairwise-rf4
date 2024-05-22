'use client';

import React, { useState } from 'react';
import Image from 'next/image'; // Make sure to install 'next/image'
import Drawer from './Drawer';
import ConnectWalletContent from './ConnectWalletContent';
import CollectVotingPowerContent from './CollectVotingPowerContent';
import { useAccount } from 'wagmi';
import { badgesImages } from '../constants/BadgesData';
import { useRouter } from 'next/navigation';
import { Routes } from '../constants/Routes';

const Header = () => {
	const { isConnected } = false; //useAccount();
	const router = useRouter();
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
			{isConnected ? (
				<div
					onClick={() => router.push(Routes.Badges)}
					className='relative flex cursor-pointer justify-center'
				>
					{badgesImages.map((image, index) => (
						<div
							key={index}
							className={`flex-shrink-0 ${index > 0 ? '-ml-7' : 'ml-0'} rounded-full p-2`}
						>
							<div className='rounded-full'>
								<Image
									width={32}
									height={32}
									src={image.src}
									alt={image.alt}
								/>
							</div>
						</div>
					))}
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
