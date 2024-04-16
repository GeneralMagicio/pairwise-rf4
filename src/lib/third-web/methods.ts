import { inAppWallet, smartWallet } from "thirdweb/wallets";
import { LAST_CONNECT_PERSONAL_WALLET_ID } from "./constants";
import { client, smartWalletConfig } from "./provider";

export const createSmartWallet = async (strategy: "google" | "apple") => {
  const socialEOA = inAppWallet();
  await socialEOA.connect({
    client,
    strategy,
  });
  console.log("eoa wallet:", socialEOA.getAccount())
  localStorage.setItem(LAST_CONNECT_PERSONAL_WALLET_ID, socialEOA.id)
  const wallet = smartWallet(smartWalletConfig);
  const EoaAccount = socialEOA.getAccount()
  await wallet.connect({
    personalAccount: EoaAccount!,
    client,
  })
  console.log("smart wallet:", wallet.getAccount())

  return wallet
}