'use client';

import React from 'react';
import { useConnect } from '../providers/ConnectProvider';
import CollectVotingPowerContent from './CollectVotingPowerContent';
import ConnectWalletContent from './ConnectWalletContent';
import Drawer from './Drawer';
import LogoutModal from './LogoutModal';

const ConnectDrawers = () => {
	const {
		handleConnect,
		isClaimDrawerOpen,
		setIsClaimDrawerOpen,
		isConnectDrawerOpen,
		setIsConnectDrawerOpen,
		isLogOutDrawerOpen,
		setIsLogOutDrawerOpen
	} = useConnect();
	return (
		<div>
			<Drawer
				setIsOpen={setIsConnectDrawerOpen}
				isOpen={isConnectDrawerOpen}
			>
				<ConnectWalletContent
					onConnect={handleConnect}
					closeDrawer={() => setIsConnectDrawerOpen(false)}
				/>
				<a
					className='text-primary underline'
					href='https://t.me/+LWJJ9psb9tUxOTJk'
					target='_blank'
				>
					Need Help?
				</a>
			</Drawer>

			<Drawer 
			setIsOpen={setIsClaimDrawerOpen} 
			isOpen={isClaimDrawerOpen}>
			<CollectVotingPowerContent
				setIsClaimDrawerOpen={setIsClaimDrawerOpen}
			/>
			</Drawer>

			<Drawer 
			setIsOpen={setIsLogOutDrawerOpen}
			isOpen={isLogOutDrawerOpen} 
			>
			<LogoutModal onClose={()=>setIsLogOutDrawerOpen(false)} />
     	 </Drawer>
		</div>
	);
};

export default ConnectDrawers;
