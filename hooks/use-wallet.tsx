"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type WalletContextType = {
  isConnected: boolean
  walletAddress: string | null
  balance: {
    sui: number
    wal: number
  }
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState({ sui: 0, wal: 0 })

  // Check if wallet was previously connected
  useEffect(() => {
    const savedWalletState = localStorage.getItem("walletConnected")
    if (savedWalletState === "true") {
      // In a real app, we would verify the connection with the wallet
      // For now, we'll simulate a connection
      const mockAddress = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

      setIsConnected(true)
      setWalletAddress(mockAddress)
      setBalance({
        sui: 125.45,
        wal: 500.75,
      })
    }
  }, [])

  const connect = async () => {
    try {
      // In a real app, this would connect to the actual Sui wallet
      // For now, we'll simulate a connection
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockAddress = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

      setIsConnected(true)
      setWalletAddress(mockAddress)
      setBalance({
        sui: 125.45,
        wal: 500.75,
      })

      // Save connection state
      localStorage.setItem("walletConnected", "true")

      return mockAddress
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      throw error
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setWalletAddress(null)
    setBalance({ sui: 0, wal: 0 })
    localStorage.removeItem("walletConnected")
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletAddress,
        balance,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

