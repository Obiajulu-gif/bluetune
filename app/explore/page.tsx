"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ExploreFilters } from "@/components/explore-filters"
import { TrackGrid } from "@/components/track-grid"
import { MusicPlayer } from "@/components/music-player"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function ExplorePage() {
  const [currentTrack, setCurrentTrack] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [filters, setFilters] = useState({
    genre: "all",
    sortBy: "trending",
  })

  // Mock data for tracks
  const tracks = [
    {
      id: "1",
      title: "Decentralized Dreams",
      artist: "Crypto Beats",
      album: "Web3 Vibes",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio1.mp3",
      genre: "electronic",
      duration: "3:45",
      plays: 12453,
      blobId: "0x7a59c632c5a29ef4d0e825c6d2d9b2bdc5f2f4e3a1b0c9d8e7f6a5b4c3d2e1f0",
    },
    {
      id: "2",
      title: "Blockchain Groove",
      artist: "Web3 Collective",
      album: "Digital Assets",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio2.mp3",
      genre: "hiphop",
      duration: "4:20",
      plays: 8721,
      blobId: "0x8b6ad743d6b39f05e1f936c7d3e0936ed4f3f5f4a2b1c0d9e8f7a6b5c4d3e2f1",
    },
    {
      id: "3",
      title: "NFT Vibes",
      artist: "Token Tunes",
      album: "Tokenized",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio3.mp3",
      genre: "pop",
      duration: "3:12",
      plays: 15632,
      blobId: "0x9c7be854f7c4a016f2g047d8e1f047fe5g4g6g5a3b2c1d0e9f8a7b6c5d4e3f2",
    },
    {
      id: "4",
      title: "Wallet Wonders",
      artist: "DeFi Sounds",
      album: "Yield Farming",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio4.mp3",
      genre: "ambient",
      duration: "2:58",
      plays: 6543,
      blobId: "0xa8d9c7b6e5f4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0",
    },
    {
      id: "5",
      title: "Smart Contract Symphony",
      artist: "Crypto Beats",
      album: "Web3 Vibes",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio5.mp3",
      genre: "electronic",
      duration: "3:37",
      plays: 9876,
      blobId: "0xb9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0",
    },
    {
      id: "6",
      title: "Metaverse Melodies",
      artist: "DeFi Sounds",
      album: "Virtual Realms",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio6.mp3",
      genre: "ambient",
      duration: "5:12",
      plays: 7654,
      blobId: "0xc0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f9",
    },
    {
      id: "7",
      title: "Token Economics",
      artist: "Web3 Collective",
      album: "Digital Assets",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio7.mp3",
      genre: "hiphop",
      duration: "3:58",
      plays: 11234,
      blobId: "0xd1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g0",
    },
    {
      id: "8",
      title: "Decentralized Autonomy",
      artist: "Token Tunes",
      album: "Tokenized",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio8.mp3",
      genre: "pop",
      duration: "4:05",
      plays: 8432,
      blobId: "0xe2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g0h1",
    },
  ]

  const handlePlayTrack = (track: any) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const filteredTracks = tracks
    .filter((track) => {
      if (filters.genre === "all") return true
      return track.genre === filters.genre
    })
    .sort((a, b) => {
      if (filters.sortBy === "trending") return b.plays - a.plays
      if (filters.sortBy === "newest") return 0 // In a real app, would compare dates
      return 0
    })

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Explore</span>{" "}
            Music
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover decentralized music from artists around the world, all stored on the Walrus Protocol.
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid grid-cols-4 max-w-md mx-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <ExploreFilters filters={filters} setFilters={setFilters} />
            <TrackGrid
              tracks={filteredTracks}
              onPlay={handlePlayTrack}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
            />
          </TabsContent>

          <TabsContent value="trending" className="mt-6">
            <ExploreFilters filters={{ ...filters, sortBy: "trending" }} setFilters={setFilters} />
            <TrackGrid
              tracks={filteredTracks}
              onPlay={handlePlayTrack}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
            />
          </TabsContent>

          <TabsContent value="new" className="mt-6">
            <ExploreFilters filters={{ ...filters, sortBy: "newest" }} setFilters={setFilters} />
            <TrackGrid
              tracks={filteredTracks}
              onPlay={handlePlayTrack}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
            />
          </TabsContent>

          <TabsContent value="featured" className="mt-6">
            <ExploreFilters filters={filters} setFilters={setFilters} />
            <TrackGrid
              tracks={filteredTracks.slice(0, 4)}
              onPlay={handlePlayTrack}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
            />
          </TabsContent>
        </Tabs>
      </div>

      {currentTrack && (
        <MusicPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onClose={() => setCurrentTrack(null)}
        />
      )}

      <Footer />
    </main>
  )
}

