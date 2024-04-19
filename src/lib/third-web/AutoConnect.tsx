'use client';

import { client, smartWalletConfig } from './provider';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { WalletId, createWallet } from 'thirdweb/wallets';
import { useConnect } from 'thirdweb/react';
import { LAST_CONNECT_PERSONAL_WALLET_ID } from './constants';

const AutoConnectContext = React.createContext<{
	isAutoConnecting: boolean | null;
	setIsAutoConnecting: Function;
}>({ isAutoConnecting: null, setIsAutoConnecting: () => {} });

export const AutoConnectProvider = ({ children }: { children: ReactNode }) => {
	const [isAutoConnecting, setIsAutoConnecting] = useState(null);

	return (
		<AutoConnectContext.Provider
			value={{ isAutoConnecting, setIsAutoConnecting }}
		>
			{children}
		</AutoConnectContext.Provider>
	);
};

export const useIsAutoConnecting = () => {
	const { isAutoConnecting, setIsAutoConnecting } =
		useContext(AutoConnectContext);

	return { isAutoConnecting, setIsAutoConnecting };
};

export const ThirdwebAutoConnect = () => {
	const { setIsAutoConnecting } = useIsAutoConnecting();
	const { connect } = useConnect();

	useEffect(() => {
		const main = async () => {
			try {
				const personalWalletId = localStorage.getItem(
					LAST_CONNECT_PERSONAL_WALLET_ID,
				);
				if (!personalWalletId) return;
				setIsAutoConnecting(true);
				const personalWallet = createWallet(
					personalWalletId as WalletId,
				);
				const personalAccount = await personalWallet.autoConnect({
					client: client,
				});
				const smartWallet = createWallet('smart', smartWalletConfig);
				await smartWallet.connect({ personalAccount, client: client });
				await connect(smartWallet);
			} finally {
				setIsAutoConnecting(false);
			}
		};

		main();
	}, [setIsAutoConnecting, connect]);

	return <></>;
};
