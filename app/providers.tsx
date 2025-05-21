// app/Providers.tsx
"use client";

import React from "react";
import { WalletProvider, Chain, SuiTestnetChain } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { ThemeProvider } from "@/components/theme-provider";

// Define custom styles to hide the chain display
const customStyle = `
  .wallet-kit-info .chain-info {
    display: none !important;
  }
`;

const SupportedChains: Chain[] = [SuiTestnetChain];

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
			<style dangerouslySetInnerHTML={{ __html: customStyle }} />
			<WalletProvider chains={SupportedChains}>{children}</WalletProvider>
		</ThemeProvider>
	);
}
