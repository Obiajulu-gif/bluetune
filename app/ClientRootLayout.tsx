// app/ClientRootLayout.tsx
"use client";

import React from "react";
import { WalletProvider, Chain, SuiTestnetChain } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";

const SupportedChains: Chain[] = [SuiTestnetChain];

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider chains={SupportedChains}>
      {children}
    </WalletProvider>
  );
}
