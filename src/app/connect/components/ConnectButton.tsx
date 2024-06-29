'use client';

import Button from '@/app/components/Button';
import Drawer from '@/app/components/Drawer';
import IconWallet from 'public/images/icons/IconWallet';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import Image from 'next/image';
import { useState } from 'react';
import { formatAddress } from '@/app/helpers/text-helpers';
import { walletsLogos } from '@/app/constants/WalletIcons';
import { isMobile } from 'react-device-detect';

const ConnectButton = () => {
	const { connectors, connectAsync } = useConnect();
	const { address } = useAccount();
	const { disconnect } = useDisconnect();
	const [isConnectDrawerOpen, setIsConnectDrawerOpen] = useState(false);

	const hasMetaMaskIO = connectors.some(
		connector => connector.id === 'io.metamask',
	);
	const filteredConnectors = hasMetaMaskIO
		? connectors.filter(connector => connector.id !== 'metaMask')
		: connectors;

	console.log('connectors', connectors);

	return (
		<div>
			{address ? (
				<div
					className='rounded-md border border-gray-300 px-4 py-2 font-semibold'
					onClick={() => disconnect()}
				>
					{formatAddress(address)}
				</div>
			) : (
				<div>
					<Button
						onClick={() => setIsConnectDrawerOpen(true)}
						className='bg-primary'
					>
						<div className='flex items-center gap-2 px-4 py-1'>
							<IconWallet />
							<p>Connect Wallet</p>
						</div>
					</Button>
					<Drawer
						isOpen={isConnectDrawerOpen}
						setIsOpen={setIsConnectDrawerOpen}
					>
						<div>
							<p className='mb-4 border-b border-gray-200 py-4 text-center text-lg font-bold '>
								Connect Wallet
							</p>
							{isMobile && (
								<p className='py-2 font-bold'>
									You can connect to your wallet using
									WalletConnect
								</p>
							)}

							<div className='flex w-full flex-col gap-2'>
								{filteredConnectors.map(connector => (
									<div
										className='flex w-full cursor-pointer select-none items-center gap-2 rounded-xl bg-gray-100 p-2 transition-colors duration-200 ease-in-out'
										key={connector.id}
										onClick={async () => {
											setIsConnectDrawerOpen(false);
											await connectAsync({
												connector,
											});
										}}
									>
										<div className='overflow-hidden rounded-full'>
											{connector.icon &&
											connector.id !== 'walletConnect' ? (
												<Image
													src={connector.icon}
													width={40}
													height={40}
													alt={connector.name}
													unoptimized
												/>
											) : (
												<Image
													src={
														walletsLogos[
															connector.id ||
																'walletConnect'
														]
													}
													width={40}
													height={40}
													alt={connector.name}
												/>
											)}
										</div>
										{connector.name}
									</div>
								))}
							</div>
							<div className='mt-2'>
								<a
									className='text-primary underline'
									href='https://t.me/+LWJJ9psb9tUxOTJk'
									target='_blank'
								>
									Need Help?
								</a>
							</div>
						</div>
					</Drawer>
				</div>
			)}
		</div>
	);
};

export default ConnectButton;
