"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause } from "lucide-react"
import { motion } from "framer-motion"
import { queryEvents } from "@/backend/get_music"

type Track = {
  id: string
  title: string
  artist: string
  coverUrl: string
  duration: string
  blobId: string
}

export function TrendingTracks() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true)
      try {
        const fetchedTracks = await queryEvents();
        if (fetchedTracks) {
          setTracks(fetchedTracks)
        }
      } catch (error) {
        console.error("Failed to fetch tracks:", error);
      } finally {
        setLoading(false)
      }
    }

    fetchTracks()
  }, [])

  const handlePlayPause = (track: Track) => {
    if (!audioRef.current) return;

    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.src = `https://aggregator.walrus-testnet.walrus.space/v1/blobs/${track.blobId}`;
      audioRef.current.play();
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Trending</span> Tracks
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover the hottest tracks on the Bluetune platform. Support artists directly through the blockchain.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((track) => (
            <Card key={track.id} className="bg-black/40 border border-gray-800 p-4 rounded-lg">
              <CardContent>
                <img src={track.coverUrl} alt={track.title} className="w-full h-40 object-cover rounded" />
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <h3 className="text-white text-lg font-bold">{track.title}</h3>
                    <p className="text-gray-400 text-sm">{track.artist}</p>
                  </div>
                  <Button
                    onClick={() => handlePlayPause(track)}
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center"
                  >
                    {currentTrack?.id === track.id && isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          className="hidden"
        />
      </div>
    </section>
  )
}
