import { Account, inAppWallet, smartWallet } from 'thirdweb/wallets';
import { LAST_CONNECT_PERSONAL_WALLET_ID } from './constants';
import { client, smartWalletConfig } from './provider';

export const createEmailEoa = async (
	email: string,
	verificationCode: string,
) => {
	const wallet = inAppWallet();
	await wallet.connect({
		client,
		strategy: 'email',
		email,
		verificationCode,
	});
	localStorage.setItem(LAST_CONNECT_PERSONAL_WALLET_ID, wallet.id);
	return wallet;
};

export const createSocialEoa = async (strategy: 'google' | 'apple') => {
	const socialEOA = inAppWallet();
	await socialEOA.connect({
		client,
		strategy,
	});
	localStorage.setItem(LAST_CONNECT_PERSONAL_WALLET_ID, socialEOA.id);
	return socialEOA;
};

export const createSmartWalletFromEOA = async (eoa: Account) => {
	const wallet = smartWallet(smartWalletConfig);
	await wallet.connect({
		personalAccount: eoa,
		client,
	});

	return wallet;
};
