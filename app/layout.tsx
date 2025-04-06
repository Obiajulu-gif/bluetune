import type React from "react"
// import { WalletProvider } from "@/hooks/use-wallet"
import "./globals.css"
import Providers from "./providers"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <WalletProvider>{children}</WalletProvider> */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };