"use client";

import React, { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

const WagmiAppProvider = ({ children }: { children: ReactNode }) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default WagmiAppProvider;
