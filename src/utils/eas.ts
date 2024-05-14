import { useState, useEffect } from 'react';
import { optimismSepolia } from 'thirdweb/chains';
import { type Address } from 'viem';
import { ethers6Adapter } from "thirdweb/adapters/ethers6";
import { useActiveWallet } from 'thirdweb/react';
import { client } from '@/lib/third-web/provider';

export type EASConfig = {
	EASDeployment: Address;
	SchemaRegistry: Address;
};

type Signer = Awaited<ReturnType<typeof ethers6Adapter.signer.toEthers>>

export function useSigner() {
	const wallet = useActiveWallet();

	const [signer, setSigner] = useState<Signer>();

	useEffect(() => {
		async function getSigner() {
      if (!wallet) return;

      const account = wallet.getAccount()
      if (!account) return;

      const ethersSigner = await ethers6Adapter.signer.toEthers({
        client,
        chain: optimismSepolia,
        account,
      });

			setSigner(ethersSigner);
		}

		getSigner();
	}, [wallet]);
	return signer;
}

interface Config extends EASConfig {
	explorer: string;
	gqlUrl: string;
}

export const EASNetworks: Record<number, Config> = {
	// Optimism
	10: {
		EASDeployment: '0x4200000000000000000000000000000000000021',
		SchemaRegistry: '0x4200000000000000000000000000000000000020',
		explorer: 'https://optimism.easscan.org',
		gqlUrl: 'https://optimism.easscan.org/graphql',
	},
  // Optimism Sepolia
	[optimismSepolia.id]: {
		EASDeployment: '0x4200000000000000000000000000000000000021',
		SchemaRegistry: '0x4200000000000000000000000000000000000020',
		explorer: `https://optimism-sepolia.blockscout.com`,
		gqlUrl: 'https://optimism-sepolia.easscan.org/graphql',
	},
};

export const SCHEMA_UID =
  '0x3e3e2172aebb902cf7aa6e1820809c5b469af139e7a4265442b1c22b97c6b2a5'
