"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ConnectWalletPrompt } from "@/components/connect-wallet-prompt"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Music, Heart, ListMusic, Clock, Settings, ExternalLink } from 'lucide-react'
import { motion } from "framer-motion"
import Link from "next/link"
import { useWallet } from "@/hooks/use-wallet"

export default function ProfilePage() {
  const { isConnected, walletAddress } = useWallet()
  const [activeTab, setActiveTab] = useState("uploads")
  
  // Mock data
  const userProfile = {
    name: "Web3 Music Lover",
    bio: "Passionate about decentralized music and supporting independent artists.",
    avatarUrl: "/placeholder.svg?height=200&width=200",
    coverUrl: "/placeholder.svg?height=400&width=1200",
    joinDate: "January 2023",
    uploads: 5,
    followers: 23,
    following: 47
  }
  
  const uploads = [
    {
      id: "1",
      title: "Decentralized Dreams",
      coverUrl: "/placeholder.svg?height=400&width=400",
      plays: 12453,
      uploadDate: "2023-09-10T14:32:45Z"
    },
    {
      id: "2",
      title: "Blockchain Beats",
      coverUrl: "/placeholder.svg?height=400&width=400",
      plays: 8721,
      uploadDate: "2023-08-15T09:21:33Z"
    },
    {
      id: "3",
      title: "Web3 Wonders",
      coverUrl: "/placeholder.svg?height=400&width=400",
      plays: 5432,
      uploadDate: "2023-07-22T16:45:12Z"
    }
  ]
  
  const favorites = [
    {
      id: "4",
      title: "NFT Vibes",
      artist: "Token Tunes",
      coverUrl: "/placeholder.svg?height=400&width=400"
    },
    {
      id: "5",
      title: "Wallet Wonders",
      artist: "DeFi Sounds",
      coverUrl: "/placeholder.svg?height=400&width=400"
    },
    {
      id: "6",
      title: "Smart Contract Symphony",
      artist: "Crypto Beats",
      coverUrl: "/placeholder.svg?height=400&width=400"
    }
  ]
  
  const playlists = [
    {
      id: "1",
      title: "Chill Web3 Vibes",
      trackCount: 12,
      coverUrl: "/placeholder.svg?height=400&width=400"
    },
    {
      id: "2",
      title: "Coding Soundtrack",
      trackCount: 8,
      coverUrl: "/placeholder.svg?height=400&width=400"
    }
  ]
  
  const recentlyPlayed = [
    {
      id: "7",
      title: "Crypto Melody",
      artist: "Blockchain Beats",
      coverUrl: "/placeholder.svg?height=60&width=60",
      playedAt: "2 hours ago"
    },
    {
      id: "8",
      title: "DeFi Dreams",
      artist: "Web3 Wonders",
      coverUrl: "/placeholder.svg?height=60&width=60",
      playedAt: "Yesterday"
    },
    {
      id: "9",
      title: "NFT Nightlife",
      artist: "Token Tunes",
      coverUrl: "/placeholder.svg?height=60&width=60",
      playedAt: "2 days ago"
    },
    {
      id: "10",
      title: "Wallet Waves",
      artist: "DeFi Sounds",
      coverUrl: "/placeholder.svg?height=60&width=60",
      playedAt: "3 days ago"
    },
    {
      id: "11",
      title: "Smart Contract Sonata",
      artist: "Crypto Beats",
      coverUrl: "/placeholder.svg?height=60&width=60",
      playedAt: "1 week ago"
    }
  ]
  
  if (!isConnected) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto">
            <ConnectWalletPrompt message="Connect your wallet to view your profile" />
          </div>
        </div>
        <Footer />
      </main>
    )
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Header />
      
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={userProfile.coverUrl || "/placeholder.svg"} 
          alt="Profile cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
          <Avatar className="h-32 w-32 border-4 border-black">
            <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
            <AvatarFallback className="bg-blue-900 text-2xl">
              {userProfile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">{userProfile.name}</h1>
            <p className="text-gray-400 mb-2">{userProfile.bio}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Joined {userProfile.joinDate}</span>
              <span>•</span>
              <span>{userProfile.uploads} Uploads</span>
              <span>•</span>
              <span>{userProfile.followers} Followers</span>
              <span>•</span>
              <span>{userProfile.following} Following</span>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
              <Edit className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
            <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mb-4 bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Wallet:</span>
              <span className="font-mono text-sm">{walletAddress}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid grid-cols-4 max-w-md">
            <TabsTrigger value="uploads" className="flex items-center gap-2">
              <Music className="h-4 w-4" /> Uploads
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" /> Favorites
            </TabsTrigger>
            <TabsTrigger value="playlists" className="flex items-center gap-2">
              <ListMusic className="h-4 w-4" /> Playlists
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="uploads" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploads.map((track) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/track/${track.id}`}>
                    <Card className="bg-black/40 backdrop-blur-sm border-blue-900/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={track.coverUrl || "/placeholder.svg"}
                            alt={track.title}
                            className="w-full aspect-square object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="font-bold text-lg">{track.title}</h3>
                            <div className="flex justify-between text-sm text-gray-400 mt-1">
                              <span>{track.plays.toLocaleString()} plays</span>
                              <span>{new Date(track.uploadDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Link href="/upload">
                  <Card className="bg-blue-900/20 backdrop-blur-sm border-blue-900/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300 h-full">
                    <CardContent className="p-0 h-full flex flex-col items-center justify-center py-12">
                      <div className="rounded-full bg-blue-900/30 p-4 mb-4">
                        <Music className="h-8 w-8 text-blue-400" />
                      </div>
                      <h3 className="font-bold text-lg mb-1">Upload New Track</h3>
                      <p className="text-gray-400 text-sm text-center px-4">
                        Share your music with the world on the Walrus Protocol
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((track) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/track/${track.id}`}>
                    <Card className="bg-black/40 backdrop-blur-sm border-blue-900/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={track.coverUrl || "/placeholder.svg"}
                            alt={track.title}
                            className="w-full aspect-square object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="font-bold text-lg">{track.title}</h3>
                            <p className="text-gray-400 text-sm">{track.artist}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="playlists" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist) => (
                <motion.div
                  key={playlist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/playlist/${playlist.id}`}>
                    <Card className="bg-black/40 backdrop-blur-sm border-blue-900/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={playlist.coverUrl || "/placeholder.svg"}
                            alt={playlist.title}
                            className="w-full aspect-square object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="font-bold text-lg">{playlist.title}</h3>
                            <p className="text-gray-400 text-sm">{playlist.trackCount} tracks</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="bg-purple-900/20 backdrop-blur-sm border-purple-900/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-0 h-full flex flex-col items-center justify-center py-12">
                    <div className="rounded-full bg-purple-900/30 p-4 mb-4">
                      <ListMusic className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">Create New Playlist</h3>
                    <p className="text-gray-400 text-sm text-center px-4">
                      Organize your favorite tracks into playlists
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <C

