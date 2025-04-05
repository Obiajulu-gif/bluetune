"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MusicPlayer } from "@/components/music-player"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Heart, Share2, MoreHorizontal, Clock, User } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [currentTrack, setCurrentTrack] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Mock playlist data
  const playlist = {
    id: params.id,
    title: "Chill Web3 Vibes",
    description: "The perfect soundtrack for building the decentralized future.",
    coverUrl: "/placeholder.svg?height=400&width=400",
    creator: "Web3 Music Lover",
    creatorId: "user1",
    createdAt: "2023-08-15T09:21:33Z",
    trackCount: 5,
    duration: "18:45",
    isPublic: true,
  }

  // Mock tracks data
  const tracks = [
    {
      id: "1",
      title: "Decentralized Dreams",
      artist: "Crypto Beats",
      album: "Web3 Vibes",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio1.mp3",
      duration: "3:45",
      plays: 12453,
    },
    {
      id: "2",
      title: "Blockchain Groove",
      artist: "Web3 Collective",
      album: "Digital Assets",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio2.mp3",
      duration: "4:20",
      plays: 8721,
    },
    {
      id: "3",
      title: "NFT Vibes",
      artist: "Token Tunes",
      album: "Tokenized",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio3.mp3",
      duration: "3:12",
      plays: 15632,
    },
    {
      id: "4",
      title: "Wallet Wonders",
      artist: "DeFi Sounds",
      album: "Yield Farming",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio4.mp3",
      duration: "2:58",
      plays: 6543,
    },
    {
      id: "5",
      title: "Smart Contract Symphony",
      artist: "Crypto Beats",
      album: "Web3 Vibes",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio5.mp3",
      duration: "3:37",
      plays: 9876,
    },
  ]

  const handlePlayTrack = (track: any) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      setCurrentTrack(tracks[0])
      setIsPlaying(true)
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? "Playlist removed from your favorites" : "Playlist added to your favorites",
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/playlist/${params.id}`)
    toast({
      title: "Link copied",
      description: "Playlist link copied to clipboard",
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <div className="sticky top-24">
              <div className="rounded-lg overflow-hidden mb-6">
                <img
                  src={playlist.coverUrl || "/placeholder.svg"}
                  alt={playlist.title}
                  className="w-full aspect-square object-cover"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={handlePlayAll}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Play className="mr-2 h-5 w-5" /> Play All
                </Button>

                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className={`border-red-500 ${isLiked ? "text-red-500 bg-red-500/10" : "text-gray-400"}`}
                    onClick={handleLike}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500" : ""}`} />
                  </Button>
                  <Button variant="outline" className="border-blue-500 text-gray-400" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="border-purple-500 text-gray-400">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="mt-6 bg-blue-900/20 rounded-lg p-4">
                <h3 className="font-medium mb-3">Playlist Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tracks:</span>
                    <span>{playlist.trackCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span>{playlist.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created:</span>
                    <span>{new Date(playlist.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Visibility:</span>
                    <span>{playlist.isPublic ? "Public" : "Private"}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-2">{playlist.title}</h1>
              <p className="text-gray-300 mb-4">{playlist.description}</p>
              <Link href={`/profile/${playlist.creatorId}`}>
                <div className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <User className="h-4 w-4" />
                  <span>Created by {playlist.creator}</span>
                </div>
              </Link>
            </div>

            <Card className="bg-black/40 backdrop-blur-sm border-blue-900/50">
              <CardContent className="p-0">
                <div className="p-4 border-b border-blue-900/50 flex items-center text-sm text-gray-400">
                  <div className="w-12 text-center">#</div>
                  <div className="flex-1">Title</div>
                  <div className="w-32 hidden md:block">Album</div>
                  <div className="w-20 text-right hidden md:block">
                    <Clock className="h-4 w-4 ml-auto" />
                  </div>
                </div>

                {tracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center p-3 hover:bg-blue-900/20 transition-colors cursor-pointer"
                    onClick={() => handlePlayTrack(track)}
                  >
                    <div className="w-12 text-center text-gray-400">{index + 1}</div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="h-10 w-10 rounded overflow-hidden">
                        <img
                          src={track.coverUrl || "/placeholder.svg"}
                          alt={track.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{track.title}</div>
                        <Link href={`/artist/${track.artist.replace(/\s+/g, "-").toLowerCase()}`}>
                          <div className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                            {track.artist}
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="w-32 text-sm text-gray-400 hidden md:block truncate">{track.album}</div>
                    <div className="w-20 text-right text-sm text-gray-400">{track.duration}</div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Recommended Playlists</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Link href={`/playlist/${i}`} key={i}>
                    <Card className="bg-black/40 backdrop-blur-sm border-blue-900/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src="/placeholder.svg?height=200&width=200"
                            alt={`Playlist ${i}`}
                            className="w-full aspect-square object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="font-bold">Recommended Playlist {i}</h3>
                            <p className="text-sm text-gray-400">5 tracks</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {currentTrack && (
        <MusicPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onClose={() => setIsPlaying(false)}
        />
      )}

      <Footer />
    </main>
  )
}

