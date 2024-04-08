"use client";

import { ReactNode } from "react";
import { ThirdwebProvider } from "thirdweb/react";

export const Thirdweb5Provider = ({ children }: { children: ReactNode }) => {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
};
