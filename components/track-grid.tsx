"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Heart, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

type TrackGridProps = {
  tracks: any[]
  onPlay: (track: any) => void
  currentTrack: any
  isPlaying: boolean
}

export function TrackGrid({ tracks, onPlay, currentTrack, isPlaying }: TrackGridProps) {
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null)

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
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {tracks.map((track) => (
        <motion.div key={track.id} variants={item}>
          <Card
            className="bg-black/40 backdrop-blur-sm border-blue-900/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300"
            onMouseEnter={() => setHoveredTrack(track.id)}
            onMouseLeave={() => setHoveredTrack(null)}
          >
            <CardContent className="p-0">
              <div className="relative group">
                <img
                  src={track.coverUrl || "/placeholder.svg"}
                  alt={track.title}
                  className="w-full aspect-square object-cover"
                />
                <div
                  className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredTrack === track.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Button
                    onClick={() => onPlay(track)}
                    variant="ghost"
                    size="icon"
                    className="h-16 w-16 rounded-full bg-blue-500/80 hover:bg-blue-600/80 text-white"
                  >
                    {currentTrack?.id === track.id && isPlaying ? (
                      <Pause className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8 ml-1" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <Link href={`/track/${track.id}`}>
                  <h3 className="font-bold text-lg mb-1 truncate hover:text-blue-400 transition-colors">
                    {track.title}
                  </h3>
                </Link>
                <Link href={`/artist/${track.artist.replace(/\s+/g, "-").toLowerCase()}`}>
                  <p className="text-gray-400 text-sm mb-2 hover:text-blue-400 transition-colors">{track.artist}</p>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{track.duration}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-400">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

