"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

type Artist = {
  name: string
  image: string
  genre: string
  followers: string
}

export function FeaturedArtists() {
  const artists: Artist[] = [
    {
      name: "Crypto Beats",
      image: "/placeholder.svg?height=200&width=200",
      genre: "Electronic",
      followers: "24.5K",
    },
    {
      name: "Web3 Collective",
      image: "/placeholder.svg?height=200&width=200",
      genre: "Hip Hop",
      followers: "18.2K",
    },
    {
      name: "Token Tunes",
      image: "/placeholder.svg?height=200&width=200",
      genre: "Pop",
      followers: "32.1K",
    },
    {
      name: "DeFi Sounds",
      image: "/placeholder.svg?height=200&width=200",
      genre: "Ambient",
      followers: "15.7K",
    },
  ]

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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Artists</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover talented artists who are pioneering the decentralized music revolution.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {artists.map((artist, index) => (
            <motion.div key={index} variants={item}>
              <Card className="bg-black/40 backdrop-blur-sm border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={artist.image || "/placeholder.svg"}
                      alt={artist.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-bold text-lg">{artist.name}</h3>
                      <p className="text-gray-400 text-sm">{artist.genre}</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <Avatar key={i} className="border-2 border-black w-6 h-6">
                            <AvatarFallback>U{i}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{artist.followers} followers</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 p-0">
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

