'use client';

import React, { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { walletConnect, metaMask, injected } from 'wagmi/connectors';

export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!;

const config = createConfig({
	chains: [mainnet, sepolia],
	connectors: [
		walletConnect({
			projectId,
		}),
		injected({ target: 'metaMask' }),
		metaMask(),
	],
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
	},
});

const WagmiAppProvider = ({ children }: { children: ReactNode }) => {
	return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default WagmiAppProvider;
