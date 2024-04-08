"use client";
import {
  ThirdwebProvider,
  smartWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { ReactNode } from "react";

const ThirdWeb = ({ children }: { children: ReactNode }) => {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId="ab996cc033833508e203e80eecca234f"
      supportedWallets={[
        smartWallet(embeddedWallet(), {
          factoryAddress: "0xA4a0b37823a19541D0d2e049cC935E6398b5AB9F",
          gasless: true,
        }),
      ]}
    >
      {children}
    </ThirdwebProvider>
  );
};

export default ThirdWeb;
