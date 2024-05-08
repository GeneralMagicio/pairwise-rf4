'use client';

import { client, smartWalletConfig } from './provider';
import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { WalletId, createWallet } from 'thirdweb/wallets';
import { useActiveAccount, useActiveWallet, useConnect } from 'thirdweb/react';
import { LAST_CONNECT_PERSONAL_WALLET_ID, activeChain } from './constants';
import { isLoggedIn, loginToPwBackend } from '@/utils/auth';
import { useRouter } from 'next/navigation';

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
	const { connect } = useConnect();
	const { replace, refresh } = useRouter();
	const { isAutoConnecting, setIsAutoConnecting } = useIsAutoConnecting();
	const account = useActiveAccount();
	const wallet = useActiveWallet()

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



	const checkLoginFlow = useCallback(async () => {
		if (!wallet && isAutoConnecting === false) {
			replace('/login');
		} else if (account && wallet) {
			const validToken = await isLoggedIn();
			if (!validToken) {	
				await loginToPwBackend(
					activeChain.id,
					account.address,
					account.signMessage,
				);
				refresh();
			}
		}
	}, [account, wallet, isAutoConnecting, replace, refresh]);
	
	useEffect(() => {checkLoginFlow()}, [replace, wallet, isAutoConnecting, checkLoginFlow]);

	return <></>;
};
