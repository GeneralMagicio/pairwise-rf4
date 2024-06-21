'use client';

import React from 'react';
import { useConnect } from '../providers/ConnectProvider';
import CollectVotingPowerContent from './CollectVotingPowerContent';
import ConnectWalletContent from './ConnectWalletContent';
import Drawer from './Drawer';

const ConnectDrawers = () => {
	const {
		handleConnect,
		isClaimDrawerOpen,
		setIsClaimDrawerOpen,
		isConnectDrawerOpen,
		setIsConnectDrawerOpen,
	} = useConnect();
	return (
		<div>
			<Drawer
				setIsOpen={setIsConnectDrawerOpen}
				isOpen={isConnectDrawerOpen}
			>
				<ConnectWalletContent onConnect={handleConnect} closeDrawer={() => setIsConnectDrawerOpen(false)} />
			</Drawer>
			<Drawer setIsOpen={setIsClaimDrawerOpen} isOpen={isClaimDrawerOpen}>
				<CollectVotingPowerContent
					setIsClaimDrawerOpen={setIsClaimDrawerOpen}
				/>
			</Drawer>
		</div>
	);
};

export default ConnectDrawers;
