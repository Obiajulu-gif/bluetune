"use client"
import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UploadForm } from "@/components/upload-form"
import { UploadSuccess } from "@/components/upload-success"
import { ConnectWalletPrompt } from "@/components/connect-wallet-prompt"
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useWallet } from "@suiet/wallet-kit";
import { getObject } from "@/lib/check-creator"
import { Transaction } from "@mysten/sui/transactions"
import { NEXT_PUBLIC_BLUETUNE, NEXT_PUBLIC_PACKAGEID } from "@/backend/package_ids"
import { Loader2 } from "lucide-react"

export default function UploadPage() {
  const { connected, address, signAndExecuteTransaction } = useWallet();
  const [uploadComplete, setUploadComplete] = useState(false)
  const [uploadedTrack, setUploadedTrack] = useState<any>(null)
  const [isCreator, setIsCreator] = useState(false)
  const [isLoadingCreatorStatus, setIsLoadingCreatorStatus] = useState(true)
  const [becomingCreator, setBecomingCreator] = useState(false)
  

  useEffect(() => {
    if (connected) {
      checkCreatorStatus()
    } else {
      setIsLoadingCreatorStatus(false)
    }
  }, [connected])

  const checkCreatorStatus = async () => {
    try {
      setIsLoadingCreatorStatus(true)
      if (!address) throw new Error("Wallet address is undefined");
      const creator_status = await getObject(address)
      if (creator_status === false) {
        setIsCreator(creator_status)
      }
      else {
        setIsCreator(true)

      }
    } catch (error) {
      console.error('Error checking creator status:', error)
    } finally {
      setIsLoadingCreatorStatus(false)
    }
  }

  const handleUploadSuccess = (trackData: any) => {
    setUploadedTrack(trackData)
    setUploadComplete(true)
  }

  const handleBecomeCreator = async () => {
    try {
      setBecomingCreator(true)
      const tx = new Transaction();
      tx.moveCall({
        target: `${NEXT_PUBLIC_PACKAGEID}::bluetune::beceome_creator`,
        arguments: [tx.object(NEXT_PUBLIC_BLUETUNE)],
        typeArguments: ["0x8270feb7375eee355e64fdb69c50abb6b5f9393a722883c1cf45f8e26048810a::wal::WAL"],
      });
      const txResult = await signAndExecuteTransaction({ transaction: tx });

      if (txResult) {
        setIsCreator(true)
      } else {
        alert('Failed to become a creator. Please try again later.')
      }
    } catch (err) {
      console.error('Error becoming a creator', err)
      alert('An error occurred. Please try again later.')
    } finally {
      setBecomingCreator(false)
    }
  }

  const renderContent = () => {
    if (!connected) {
      return <ConnectWalletPrompt message="Connect your wallet to upload music" />
    }

    if (isLoadingCreatorStatus) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
          <p>Checking creator status...</p>
        </div>
      ) 
    }
    
    if (!isCreator) {
      return (
        <Card className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-md border-blue-900/50">
          <CardHeader>
            <CardTitle className="text-2xl font-space-grotesk bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Become a Creator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>You need to be a creator to upload music. Become a creator to start sharing your tracks!</p>
            <Button 
              onClick={handleBecomeCreator} 
              disabled={becomingCreator}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {becomingCreator ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Become a Creator'
              )}
            </Button>
          </CardContent>
        </Card>
      )
    }

    if (uploadComplete) {
      return <UploadSuccess trackData={uploadedTrack} />
    }

    return <UploadForm onUploadSuccess={handleUploadSuccess} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-8 text-center">
          Upload Music
        </h1>
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>
      <Footer />
    </main>
  )
}