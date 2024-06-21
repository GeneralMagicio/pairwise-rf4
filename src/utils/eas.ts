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
  '0x8c12749f56c911dbc13a6a6685b6964c3ea03023f246137e9c53ba97974e4b75'
