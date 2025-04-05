"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react"
import { motion } from "framer-motion"

type Track = {
  id: string
  title: string
  artist: string
  cover: string
  duration: string
}

export function TrendingTracks() {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const tracks: Track[] = [
    {
      id: "1",
      title: "Decentralized Dreams",
      artist: "Crypto Beats",
      cover: "/placeholder.svg?height=400&width=400",
      duration: "3:45",
    },
    {
      id: "2",
      title: "Blockchain Groove",
      artist: "Web3 Collective",
      cover: "/placeholder.svg?height=400&width=400",
      duration: "4:20",
    },
    {
      id: "3",
      title: "NFT Vibes",
      artist: "Token Tunes",
      cover: "/placeholder.svg?height=400&width=400",
      duration: "3:12",
    },
    {
      id: "4",
      title: "Wallet Wonders",
      artist: "DeFi Sounds",
      cover: "/placeholder.svg?height=400&width=400",
      duration: "2:58",
    },
  ]

  const togglePlay = (trackId: string) => {
    if (currentTrack === trackId) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentTrack(trackId)
      setIsPlaying(true)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Trending</span>{" "}
            Tracks
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover the hottest tracks on the Bluetune platform. Support artists directly through the blockchain.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {tracks.map((track) => (
            <motion.div key={track.id} variants={item}>
              <Card className="bg-black/40 backdrop-blur-sm border-blue-900/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative group">
                    <img
                      src={track.cover || "/placeholder.svg"}
                      alt={track.title}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <Button
                        onClick={() => togglePlay(track.id)}
                        variant="ghost"
                        size="icon"
                        className="h-16 w-16 rounded-full bg-blue-500/80 hover:bg-blue-600/80 text-white"
                      >
                        {currentTrack === track.id && isPlaying ? (
                          <Pause className="h-8 w-8" />
                        ) : (
                          <Play className="h-8 w-8 ml-1" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 truncate">{track.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{track.artist}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{track.duration}</span>
                      <div className="flex items-center gap-1">
                        <div className="h-1 w-1 rounded-full bg-blue-500 animate-pulse"></div>
                        <div className="h-1 w-1 rounded-full bg-purple-500 animate-pulse delay-75"></div>
                        <div className="h-1 w-1 rounded-full bg-blue-500 animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {currentTrack && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-blue-900/50 p-3 z-40"
          >
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={tracks.find((t) => t.id === currentTrack)?.cover || "/placeholder.svg"}
                  alt="Now playing"
                  className="h-12 w-12 rounded"
                />
                <div>
                  <h4 className="font-medium">{tracks.find((t) => t.id === currentTrack)?.title}</h4>
                  <p className="text-sm text-gray-400">{tracks.find((t) => t.id === currentTrack)?.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-gray-400" />
                <div className="w-24 h-1 bg-gray-700 rounded-full">
                  <div className="w-1/2 h-full bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

