// components/Header.jsx
import React, { useState } from 'react';
import Image from 'next/image'; // Make sure to install 'next/image'
import Drawer from './Drawer';
import ConnectWalletContent from './ConnectWalletContent';

const Header = () => {
	const [isConnectDrawerOpen, setIsConnectDrawerOpen] = useState(false);
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
			<button
				onClick={() => setIsConnectDrawerOpen(true)}
				className='rounded-full bg-primary px-4 py-2 text-sm text-white'
			>
				Connect
			</button>
			<Drawer
				setIsOpen={setIsConnectDrawerOpen}
				isOpen={isConnectDrawerOpen}
			>
				<ConnectWalletContent />
			</Drawer>
		</header>
	);
};

export default Header;
