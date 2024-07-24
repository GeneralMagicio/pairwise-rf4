import { optimism, optimismSepolia } from 'thirdweb/chains';

const getActiveChain = (chain?: string) => {
	switch (chain) {
		case 'optimism':
			return optimism;
		case 'optimism-sepolia':
			return optimismSepolia;
		default:
			return optimismSepolia;
	}
};

export const activeChain = getActiveChain(
	process.env.NEXT_PUBLIC_THIRDWEB_ACTIVE_CHAIN,
);
export const factoryAddress =
	process.env.NEXT_PUBLIC_THIRDWEB_FACTORY_ADDRESS ||
	'0xE424DC62723a40FCE052c5300699C28A3bD7cc01';
export const clientId =
	process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID ||
	'ab996cc033833508e203e80eecca234f';
export const LAST_CONNECT_PERSONAL_WALLET_ID =
	'last-connect-personal-wallet-id';
