// app/Providers.tsx
"use client";

import React from "react";
import { WalletProvider, Chain, SuiTestnetChain } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { ThemeProvider } from "@/components/theme-provider";

const SupportedChains: Chain[] = [SuiTestnetChain];

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      <WalletProvider chains={SupportedChains}>
        {children}
      </WalletProvider>
    </ThemeProvider>
  );
}
