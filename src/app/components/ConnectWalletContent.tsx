'use client';

import Image from 'next/image';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const ConnectWalletContent = () => {
	const { connectors, connect } = useConnect();
	const { address } = useAccount();
	const { disconnect } = useDisconnect();
	console.log('Connectors', connectors);
	return (
		<div className='w-full'>
			<p className='mb-4 border-b border-gray-200 py-4 text-center text-lg font-bold '>
				Connect Wallet
			</p>
			<div className='mt-4'>
				{address ? (
					<button onClick={() => disconnect()}>Disconnect</button>
				) : (
					<div className='flex w-full flex-col gap-2'>
						{connectors.map(connector => (
							<div
								className='flex w-full cursor-pointer items-center gap-2 rounded-xl bg-gray-100 p-2 transition-colors duration-200 ease-in-out'
								key={connector.id}
								onClick={() => connect({ connector })}
							>
								<div className='overflow-hidden rounded-full'>
									{connector.icon &&
									connector.id !== 'walletConnect' ? (
										<Image
											src={connector.icon}
											width={40}
											height={40}
											alt={connector.name}
										/>
									) : (
										<Image
											src='/images/wallets/walletconnect-logo.png'
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
				)}
			</div>
		</div>
	);
};

export default ConnectWalletContent;
