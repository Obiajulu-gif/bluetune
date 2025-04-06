"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Loader2 } from "lucide-react"
import { ConnectButton} from "@suiet/wallet-kit";

type ConnectWalletPromptProps = {
  message?: string
  onClose?: () => void
}

export function ConnectWalletPrompt({ message, onClose }: ConnectWalletPromptProps) {
  // const { connect } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // const handleConnect = async () => {
  //   setIsConnecting(true)
  //   setError(null)

  //   try {
  //     await connect()
  //     if (onClose) {
  //       onClose()
  //     }
  //   } catch (err) {
  //     setError("Failed to connect wallet. Please try again.")
  //     console.error(err)
  //   } finally {
  //     setIsConnecting(false)
  //   }
  // }

  return (
    <Card className="bg-black/40 backdrop-blur-md border-blue-900/50">
      <CardHeader>
        <CardTitle className="text-2xl font-space-grotesk bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Connect Your Wallet
        </CardTitle>
        <CardDescription>{message || "Connect your Sui wallet to access this feature"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-900/20 p-6">
            <Wallet className="h-12 w-12 text-blue-400" />
          </div>
        </div>

        <div className="text-center text-sm text-gray-400">
          <p>Bluetune uses the Sui blockchain for secure, decentralized music storage and streaming.</p>
          <p className="mt-2">Connect your wallet to upload, stream, and interact with music on the platform.</p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-900/50 text-red-400 p-3 rounded-md text-sm">{error}</div>
        )}
      </CardContent>
      <CardFooter>
        {/* <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            "Connect Wallet"
          )}
        </Button> */}
        <ConnectButton/>
      </CardFooter>
    </Card>
  )
}

