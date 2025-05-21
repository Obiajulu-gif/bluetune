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
import { OptimizedImage } from "@/components/ui/optimized-image"
import { images } from "@/config/images"

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
    coverUrl: images.featuredArtists[0].url,
    avatarUrl: images.testimonials[0].url,
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
      coverUrl: images.featuredArtists[1].url,
      audioUrl: "https://example.com/audio1.mp3",
      duration: "3:45",
      plays: 12453,
      releaseDate: "2023-09-15",
    },
    {
      id: "2",
      title: "Blockchain Groove",
      album: "Digital Assets",
      coverUrl: images.featuredArtists[2].url,
      audioUrl: "https://example.com/audio2.mp3",
      duration: "4:20",
      plays: 8721,
      releaseDate: "2023-08-22",
    },
    {
      id: "3",
      title: "NFT Vibes",
      album: "Tokenized",
      coverUrl: images.featuredArtists[0].url,
      audioUrl: "https://example.com/audio3.mp3",
      duration: "3:12",
      plays: 15632,
      releaseDate: "2023-07-10",
    },
    {
      id: "4",
      title: "Wallet Wonders",
      album: "Yield Farming",
      coverUrl: images.featuredArtists[1].url,
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
      coverUrl: images.featuredArtists[0].url,
      trackCount: 5,
      releaseDate: "2023-09-15",
    },
    {
      id: "2",
      title: "Digital Assets",
      coverUrl: images.featuredArtists[1].url,
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

      <div className="relative">
        <div className="h-64 md:h-80 overflow-hidden relative">
          <OptimizedImage
            src={artist.coverUrl}
            alt={`${artist.name} cover`}
            width={1200}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-24 mb-8 flex flex-col md:flex-row gap-6 items-start md:items-end">
            <div className="relative z-10">
              <OptimizedImage
                src={artist.avatarUrl}
                alt={artist.name}
                width={200}
                height={200}
                className="rounded-lg shadow-xl border-4 border-black aspect-square object-cover"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{artist.name}</h1>
              <p className="text-gray-400 max-w-2xl mb-4">{artist.bio}</p>

              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{artist.followers.toLocaleString()} followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  <span>{artist.tracks} tracks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Disc className="w-4 h-4" />
                  <span>{artist.albums} albums</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(artist.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className={isFollowing ? "bg-blue-600" : ""}
                onClick={() => {
                  setIsFollowing(!isFollowing)
                  toast({
                    title: isFollowing ? "Unfollowed artist" : "Following artist",
                    description: isFollowing
                      ? `You are no longer following ${artist.name}`
                      : `You are now following ${artist.name}`,
                  })
                }}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/artist/${params.slug}`)
                toast({
                  title: "Link copied",
                  description: "Artist profile link copied to clipboard",
                })
              }}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="tracks" className="mb-12">
            <TabsList>
              <TabsTrigger value="tracks">Tracks</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
            </TabsList>
            <TabsContent value="tracks" className="mt-6">
              <div className="grid gap-4">
                {tracks.map((track, index) => (
                  <Card
                    key={track.id}
                    className="bg-black/40 backdrop-blur-sm border-blue-900/50 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 overflow-hidden rounded">
                          <OptimizedImage
                            src={track.coverUrl}
                            alt={track.title}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{track.title}</h3>
                          <p className="text-sm text-gray-400">{track.album}</p>
                        </div>
                        <div className="text-sm text-gray-400 hidden md:block">
                          {track.duration}
                        </div>
                        <div className="text-sm text-gray-400 hidden md:block">
                          {track.plays.toLocaleString()} plays
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCurrentTrack(track)
                            setIsPlaying(true)
                          }}
                        >
                          Play
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="albums" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {albums.map((album) => (
                  <Card
                    key={album.id}
                    className="bg-black/40 backdrop-blur-sm border-blue-900/50 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square rounded-lg overflow-hidden mb-4">
                        <OptimizedImage
                          src={album.coverUrl}
                          alt={album.title}
                          width={300}
                          height={300}
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-medium mb-1">{album.title}</h3>
                      <p className="text-sm text-gray-400">
                        {album.trackCount} tracks • {new Date(album.releaseDate).getFullYear()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {currentTrack && (
        <MusicPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onClose={() => {
            setCurrentTrack(null)
            setIsPlaying(false)
          }}
        />
      )}

      <Footer />
    </main>
  )
}

