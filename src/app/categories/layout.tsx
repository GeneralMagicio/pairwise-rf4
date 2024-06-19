'use client';

import React, { ReactNode } from 'react';
import Header from '../components/Header'; // Adjust the path as necessary
import { useParams } from 'next/navigation';
import CollectVotingPowerContent from '../components/CollectVotingPowerContent';
import ConnectWalletContent from '../components/ConnectWalletContent';
import Drawer from '../components/Drawer';
import { useConnect } from '../providers/ConnectProvider';

const CategoriesLayout = ({ children }: { children: ReactNode }) => {
	const params = useParams();
	const {
		handleConnect,
		isClaimDrawerOpen,
		setIsClaimDrawerOpen,
		isConnectDrawerOpen,
		setIsConnectDrawerOpen,
	} = useConnect();

	console.log('params', params);

	return (
		<div className='centered-mobile-max-width'>
			{!params.categoryId && <Header />}
			{children}
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
		</div>
	);
};

export default CategoriesLayout;
