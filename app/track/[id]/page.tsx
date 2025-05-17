"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Play, Pause, Heart, Share2, Download, Clock, Music2 } from "lucide-react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ConnectWalletPrompt } from "@/components/connect-wallet-prompt"
// import { useWallet } from "@/hooks/use-wallet"
import { useWallet } from "@suiet/wallet-kit";

// Mock data for track details
const mockTrackData = {
  id: "1",
  title: "Cosmic Waves",
  artist: "Stellar Beats",
  artistId: "stellar-beats",
  coverArt: "/placeholder.svg?height=400&width=400",
  audioUrl: "#",
  duration: "3:45",
  plays: 12543,
  likes: 1024,
  releaseDate: "2023-09-15",
  genre: "Electronic",
  description: "A journey through space and time with ambient electronic beats and cosmic synth waves.",
  blobId: "0x1a2b3c4d5e6f",
  isOwned: true,
  price: 0.5,
  currency: "SUI",
}

// Mock related tracks
const relatedTracks = [
  {
    id: "2",
    title: "Lunar Rhythm",
    artist: "Stellar Beats",
    coverArt: "/placeholder.svg?height=200&width=200",
    duration: "4:12",
  },
  {
    id: "3",
    title: "Solar Flare",
    artist: "Cosmic DJ",
    coverArt: "/placeholder.svg?height=200&width=200",
    duration: "3:28",
  },
  {
    id: "4",
    title: "Nebula Dreams",
    artist: "Astral Sound",
    coverArt: "/placeholder.svg?height=200&width=200",
    duration: "5:16",
  },
]

export default function TrackDetailPage() {
  const { id } = useParams()
  const { connected } = useWallet()
  const [track, setTrack] = useState(mockTrackData)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showWalletPrompt, setShowWalletPrompt] = useState(false)

  useEffect(() => {
    // In a real app, fetch track data based on ID
    console.log(`Fetching track with ID: ${id}`)
    // For now, we'll use mock data
  }, [id])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleLike = () => {
    if (!connected) {
      setShowWalletPrompt(true)
      return
    }
    setIsLiked(!isLiked)
  }

  const handlePurchase = () => {
    if (!connected) {
      setShowWalletPrompt(true)
      return
    }
    // Handle purchase logic
    alert(`Purchase track for ${track.price} ${track.currency}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black">
      <Header />

      {showWalletPrompt && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full">
            <ConnectWalletPrompt message="Connect your wallet to interact with this track" />
            <button
              onClick={() => setShowWalletPrompt(false)}
              className="mt-4 w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Track Cover and Basic Info */}
          <div className="w-full lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square rounded-lg overflow-hidden shadow-xl"
            >
              <img
                src={track.coverArt || "/placeholder.svg"}
                alt={track.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePlayPause}
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="text-white" size={24} />
                  ) : (
                    <Play className="text-white ml-1" size={24} />
                  )}
                </button>

                <div className="flex space-x-3">
                  <button
                    onClick={handleLike}
                    className={`p-3 rounded-full ${isLiked ? "bg-pink-600" : "bg-gray-800"} hover:bg-pink-700 transition-colors`}
                  >
                    <Heart className={`${isLiked ? "fill-white text-white" : "text-white"}`} size={20} />
                  </button>

                  <button className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                    <Share2 className="text-white" size={20} />
                  </button>

                  <button className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                    <Download className="text-white" size={20} />
                  </button>
                </div>
              </div>

              {!track.isOwned && (
                <button
                  onClick={handlePurchase}
                  className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
                >
                  Purchase for {track.price} {track.currency}
                </button>
              )}
            </div>
          </div>

          {/* Track Details */}
          <div className="w-full lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{track.title}</h1>
                <Link
                  href={`/artist/${track.artistId}`}
                  className="text-xl text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {track.artist}
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 text-gray-300">
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{track.duration}</span>
                </div>
                <div className="flex items-center">
                  <Music2 size={16} className="mr-2" />
                  <span>{track.genre}</span>
                </div>
                <div>
                  <span>{track.plays.toLocaleString()} plays</span>
                </div>
                <div>
                  <span>{track.likes.toLocaleString()} likes</span>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white mb-3">About This Track</h2>
                <p className="text-gray-300">{track.description}</p>
              </div>

              <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white mb-3">Blockchain Details</h2>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Blob ID:</span>
                    <span className="font-mono text-purple-400">{track.blobId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage Type:</span>
                    <span>Permanent Blob (Walrus Protocol)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Released:</span>
                    <span>{track.releaseDate}</span>
                  </div>
                </div>
              </div>

              {/* Related Tracks */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">More Like This</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedTracks.map((relatedTrack) => (
                    <Link
                      href={`/track/${relatedTrack.id}`}
                      key={relatedTrack.id}
                      className="flex items-center p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="w-12 h-12 relative rounded overflow-hidden mr-3">
                        <img
                          src={relatedTrack.coverArt || "/placeholder.svg"}
                          alt={relatedTrack.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{relatedTrack.title}</p>
                        <p className="text-gray-400 text-sm truncate">{relatedTrack.artist}</p>
                      </div>
                      <span className="text-gray-400 text-sm">{relatedTrack.duration}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

