"use client";

import { WalletProvider, Chain, SuiTestnetChain } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";

const SupportedChains: Chain[] = [
  SuiTestnetChain,
];

export default function Providers({ children }: { children: any }) {
  return <WalletProvider chains={SupportedChains}>{children}</WalletProvider>;
}