"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { motion } from "framer-motion"
import { Play, Pause, Disc3 } from "lucide-react"
import { queryEvents } from "@/backend/get_music"

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [latestTrack, setLatestTrack] = useState<any>(null)
  const [hasLoadedTrack, setHasLoadedTrack] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchLatestTrack = async () => {
      try {
        const fetchedTracks = await queryEvents();
        if (fetchedTracks && fetchedTracks.length > 0) {
          setLatestTrack(fetchedTracks[1]);
        }
      } catch (error) {
        console.error("Failed to fetch tracks:", error);
      }
    }

    fetchLatestTrack();
  }, []);

  const handleStartListening = () => {
    if (!latestTrack || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (!hasLoadedTrack) {
        audioRef.current.src = `https://aggregator.walrus-testnet.walrus.space/v1/blobs/${latestTrack.blobId}`;
        setHasLoadedTrack(true);
      }
      audioRef.current.play().catch((error) => console.error("Playback failed:", error));
    }
  }

  const handleAudioPlay = () => setIsPlaying(true);
  const handleAudioPause = () => setIsPlaying(false);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-space-grotesk mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  Decentralized
                </span>{" "}
                Music Streaming
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto md:mx-0"
            >
              Own your music, support artists directly, and experience the future of music streaming on the Sui blockchain.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Button
                size="lg"
                onClick={handleStartListening}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium"
              >
                {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                {isPlaying ? "Pause" : "Start Listening"}
              </Button>
              <ConnectWalletButton />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 20,
                  ease: "linear",
                }}
                className="w-full aspect-square rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 p-1"
              >
                <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center">
                  <Disc3 className="w-1/2 h-1/2 text-blue-400" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <audio
        ref={audioRef}
        onPlay={handleAudioPlay}
        onPause={handleAudioPause}
        onEnded={handleAudioPause}
        className="hidden"
      />
    </section>
  )
}
