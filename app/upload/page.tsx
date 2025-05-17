"use client"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UploadForm } from "@/components/upload-form"
import { UploadSuccess } from "@/components/upload-success"
import { ConnectWalletPrompt } from "@/components/connect-wallet-prompt"
// import { useWallet } from "@/hooks/use-wallet"
import { useWallet } from "@suiet/wallet-kit";

export default function UploadPage() {
  // const { isConnected } = useWallet()
  const { connected } = useWallet();
  const [uploadComplete, setUploadComplete] = useState(false)
  const [uploadedTrack, setUploadedTrack] = useState<any>(null)

  const handleUploadSuccess = (trackData: any) => {
    setUploadedTrack(trackData)
    setUploadComplete(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-8 text-center">
          Upload Music
        </h1>
        <div className="max-w-4xl mx-auto">
          {!connected ? (
            <ConnectWalletPrompt message="Connect your wallet to upload music" />
            // <h1>dkjd</h1>
          ) : !uploadComplete ? (
            <UploadForm onUploadSuccess={handleUploadSuccess} />
          ) : (
            <UploadSuccess trackData={uploadedTrack} />
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}

