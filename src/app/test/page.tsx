"use client";
import {
  ConnectWallet,
  Web3Button,
  useOwnedNFTs,
  useAddress,
  useContract,
  ThirdwebNftMedia,
  useClaimNFT,
} from "@thirdweb-dev/react";

import { NextPage } from "next";

const Test: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(
    "0x3F01B89cef5257CCD0f37F631a40365Fb0F1886a"
  );
  const { data, isLoading } = useOwnedNFTs(contract, address);
  const { mutateAsync: claim, isLoading: isClaiming } = useClaimNFT(contract);
  return (
    <main>
      <div>
        <div>
          <h1>Account Abstraction Demo</h1>
          <div>
            <ConnectWallet
              // @ts-ignore
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
            />

            {address ? (
              <div>
                <Web3Button
                  contractAddress="0x3F01B89cef5257CCD0f37F631a40365Fb0F1886a"
                  action={() =>
                    claim({
                      tokenId: 0,
                      quantity: 1,
                    })
                  }
                >
                  Claim Edition NFT
                </Web3Button>
              </div>
            ) : (
              <p>Please log in with your Google account or email</p>
            )}
            {address && isLoading ? <p>Loading Owned NFTs...</p> : null}
            {address && !isLoading && data && data.length === 0 ? (
              <p>
                {isClaiming
                  ? "Deploying your account and claiming..."
                  : "No NFTs, claim one now!"}
              </p>
            ) : null}
            {data &&
              data?.map((nft) => (
                <div key={nft.metadata.id}>
                  <ThirdwebNftMedia metadata={nft.metadata} />
                  <p>
                    You own {nft.quantityOwned} {nft.metadata.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Test;
