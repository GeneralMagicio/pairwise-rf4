'use client';

import { ReactNode } from 'react';
import { createThirdwebClient } from 'thirdweb';
import { ThirdwebProvider } from 'thirdweb/react';
import { activeChain, clientId, factoryAddress } from './constants';
import { ThirdwebAutoConnect } from './AutoConnect';

export const smartWalletConfig = {
	factoryAddress: factoryAddress,
	chain: activeChain,
	gasless: true,
};

export const client = createThirdwebClient({ clientId });

export const Thirdweb5Provider = ({ children }: { children: ReactNode }) => {
	return (
		<ThirdwebProvider>
			<ThirdwebAutoConnect />
			{children}
		</ThirdwebProvider>
	);
};
