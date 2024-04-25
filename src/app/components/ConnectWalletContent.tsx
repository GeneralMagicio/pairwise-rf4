'use client';

import Image from 'next/image';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const ConnectWalletContent = () => {
	const { connectors, connect } = useConnect();
	const { address } = useAccount();
	const { disconnect } = useDisconnect();
	console.log('Connectors', connectors);
	return (
		<div>
			{address ? (
				<button onClick={() => disconnect()}>Disconnect</button>
			) : (
				<div className='flex flex-col'>
					{connectors.map(connector => (
						<button
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
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default ConnectWalletContent;
