"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MusicPlayer } from "@/components/music-player"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Share2, Music, User, Calendar, Disc } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ArtistPage({ params }: { params: { slug: string } }) {
  const { toast } = useToast()
  const [currentTrack, setCurrentTrack] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  // Convert slug back to artist name for display
  const artistName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Mock artist data
  const artist = {
    name: artistName,
    bio: "Creating decentralized music for the Web3 generation. Exploring the intersection of blockchain technology and sound.",
    coverUrl: "/placeholder.svg?height=400&width=1200",
    avatarUrl: "/placeholder.svg?height=400&width=400",
    followers: 24500,
    tracks: 12,
    albums: 2,
    joinedDate: "2023-01-15T09:21:33Z",
    walletAddress: "0x7a59c632c5a29ef4d0e825c6d2d9b2bdc5f2f4e3",
  }

  // Mock tracks data
  const tracks = [
    {
      id: "1",
      title: "Decentralized Dreams",
      album: "Web3 Vibes",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio1.mp3",
      duration: "3:45",
      plays: 12453,
      releaseDate: "2023-09-15",
    },
    {
      id: "2",
      title: "Blockchain Groove",
      album: "Digital Assets",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio2.mp3",
      duration: "4:20",
      plays: 8721,
      releaseDate: "2023-08-22",
    },
    {
      id: "3",
      title: "NFT Vibes",
      album: "Tokenized",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio3.mp3",
      duration: "3:12",
      plays: 15632,
      releaseDate: "2023-07-10",
    },
    {
      id: "4",
      title: "Wallet Wonders",
      album: "Yield Farming",
      coverUrl: "/placeholder.svg?height=400&width=400",
      audioUrl: "https://example.com/audio4.mp3",
      duration: "2:58",
      plays: 6543,
      releaseDate: "2023-06-05",
    },
  ]

  // Mock albums data
  const albums = [
    {
      id: "1",
      title: "Web3 Vibes",
      coverUrl: "/placeholder.svg?height=400&width=400",
      trackCount: 5,
      releaseDate: "2023-09-15",
    },
    {
      id: "2",
      title: "Digital Assets",
      coverUrl: "/placeholder.svg?height=400&width=400",
      trackCount: 7,
      releaseDate: "2023-03-22",
    },
  ]

  const handlePlayTrack = (track: any) => {
    setCurrentTrack({
      ...track,
      artist: artist.name,
    })
    setIsPlaying(true)
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing ? `You are no longer following ${artist.name}` : `You are now following ${artist.name}`,
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/artist/${params.slug}`)
    toast({
      title: "Link copied",
      description: "Artist profile link copied to clipboard",
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Header />

      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={artist.coverUrl || "/placeholder.svg"} alt={artist.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
          <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-black">
            <img
              src={artist.avatarUrl || "/placeholder.svg"}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{artist.name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{formatNumber(artist.followers)} followers</span>
              <span>•</span>
              <span>{artist.tracks} tracks</span>
              <span>•</span>
              <span>{artist.albums} albums</span>
            </div>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <Button
              onClick={handleFollow}
              className={
                isFollowing
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              }
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Button
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-300 max-w-3xl">{artist.bio}</p>
        </div>

        <Tabs defaultValue="tracks" className="mb-12">
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="tracks" className="flex items-center gap-2">
              <Music className="h-4 w-4" /> Tracks
            </TabsTrigger>
            <TabsTrigger value="albums" className="flex items-center gap-2">
              <Disc className="h-4 w-4" /> Albums
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <User className="h-4 w-4" /> About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracks" className="mt-6">
            <Card className="bg-black/40 backdrop-blur-sm border-blue-900/50 mb-6">
              <CardContent className="p-0">
                <div className="p-4 border-b border-blue-900/50 flex items-center text-sm text-gray-400">
                  <div className="w-12 text-center">#</div>
                  <div className="flex-1">Title</div>
                  <div className="w-32 hidden md:block">Album</div>
                  <div className="w-32 hidden md:block">Release Date</div>
                  <div className="w-20 text-right">Plays</div>
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
                      <div className="font-medium">{track.title}</div>
                    </div>
                    <div className="w-32 text-sm text-gray-400 hidden md:block truncate">{track.album}</div>
                    <div className="w-32 text-sm text-gray-400 hidden md:block">
                      {new Date(track.releaseDate).toLocaleDateString()}
                    </div>
                    <div className="w-20 text-right text-sm text-gray-400">{formatNumber(track.plays)}</div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <div className="text-center">
              <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                Load More Tracks
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="albums" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/album/${album.id}`}>
                    <Card className="bg-black/40 backdrop-blur-sm border-blue-900/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={album.coverUrl || "/placeholder.svg"}
                            alt={album.title}
                            className="w-full aspect-square object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="font-bold text-lg">{album.title}</h3>
                            <div className="flex justify-between text-sm text-gray-400 mt-1">
                              <span>{album.trackCount} tracks</span>
                              <span>{new Date(album.releaseDate).getFullYear()}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Card className="bg-black/40 backdrop-blur-sm border-blue-900/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">About {artist.name}</h3>
                <p className="text-gray-300 mb-6">{artist.bio}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">Joined Bluetune</h4>
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-400" />
                        {new Date(artist.joinedDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-400 mb-1">Wallet Address</h4>
                      <p className="font-mono text-xs break-all bg-blue-900/20 p-2 rounded">{artist.walletAddress}</p>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Stats</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Tracks:</span>
                        <span>{artist.tracks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Albums:</span>
                        <span>{artist.albums}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Followers:</span>
                        <span>{formatNumber(artist.followers)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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

