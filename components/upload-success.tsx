"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, Copy, ExternalLink, Share2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

type UploadSuccessProps = {
  trackData: {
    id: string
    title: string
    artist: string
    coverUrl?: string
    blobId: string
    audioUrl?: string
  }
}

export function UploadSuccess({ trackData }: UploadSuccessProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const copyBlobId = () => {
    navigator.clipboard.writeText(trackData.blobId)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "Blob ID copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const shareTrack = () => {
    if (navigator.share) {
      navigator.share({
        title: trackData.title,
        text: `Check out "${trackData.title}" by ${trackData.artist} on Bluetune!`,
        url: `/track/${trackData.id}`,
      })
    } else {
      toast({
        title: "Share link copied!",
        description: "Track link copied to clipboard",
      })
      navigator.clipboard.writeText(`${window.location.origin}/track/${trackData.id}`)
    }
  }

  return (
    <Card className="bg-black/40 backdrop-blur-md border-green-500/50">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-full bg-green-500/20 p-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-space-grotesk bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            Upload Successful!
          </CardTitle>
        </div>
        <CardDescription>Your track has been successfully uploaded to the Walrus Protocol</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-24 w-24 rounded-md overflow-hidden">
            <img
              src={trackData.coverUrl || "/placeholder.svg?height=96&width=96"}
              alt={trackData.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">{trackData.title}</h3>
            <p className="text-gray-400">{trackData.artist}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-400">Blob ID (Walrus Protocol)</div>
          <div className="flex items-center gap-2">
            <code className="bg-gray-900 p-2 rounded text-xs font-mono flex-1 overflow-hidden overflow-ellipsis">
              {trackData.blobId}
            </code>
            <Button variant="outline" size="icon" className="shrink-0" onClick={copyBlobId}>
              {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-medium mb-2">What happens next?</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Your track is now permanently stored on the Walrus Protocol</li>
            <li>• It's immediately available for streaming and sharing</li>
            <li>• You can manage your uploads from your profile page</li>
            <li>• You'll earn WAL/SUI tokens when others stream your music</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          asChild
        >
          <Link href={`/track/${trackData.id}`}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View Track Page
          </Link>
        </Button>
        <Button variant="outline" className="w-full sm:w-auto" onClick={shareTrack}>
          <Share2 className="h-4 w-4 mr-2" />
          Share Track
        </Button>
        <Button variant="ghost" className="w-full sm:w-auto" asChild>
          <Link href="/upload">Upload Another Track</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

