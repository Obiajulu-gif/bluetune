// app/layout.tsx
import React from "react";
import "./globals.css";
import "./wallet-kit-overrides.css";
import "./music-animations.css";
import Providers from "./providers";
import { ThemeProvider } from "next-themes";
export const metadata = {
	title: "Bluetune",
	description: "Decentralized Music Streaming Platform",
	generator: "v0.dev",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<ThemeProvider attribute="class" defaultTheme="system">
						{children}
					</ThemeProvider>
				</Providers>
			</body>
		</html>
	);
}
