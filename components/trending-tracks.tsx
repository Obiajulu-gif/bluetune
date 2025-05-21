"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { queryEvents } from "@/backend/get_music_new";

type Track = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  duration: string;
  blobId: string;
};

// Static fallback data to use during SSR
const fallbackTracks: Track[] = [
  {
    id: "1",
    title: "Digital Dreams",
    artist: "Blockchain Beats",
    coverUrl: "/placeholder.svg",
    duration: "3:45",
    blobId: ""
  },
  {
    id: "2",
    title: "Crypto Vibes",
    artist: "Web3 Collective",
    coverUrl: "/placeholder.svg",
    duration: "4:20",
    blobId: ""
  },
  {
    id: "3",
    title: "Decentralized",
    artist: "Token Tunes",
    coverUrl: "/placeholder.svg",
    duration: "3:12",
    blobId: ""
  },
  {
    id: "4",
    title: "Wallet Wonders",
    artist: "DeFi Sounds",
    coverUrl: "/placeholder.svg",
    duration: "2:58",
    blobId: ""
  }
];

export function TrendingTracks() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<Track[]>(fallbackTracks);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      try {
        const fetchedTracks = await queryEvents();
        if (fetchedTracks && Array.isArray(fetchedTracks) && fetchedTracks.length > 0) {
          // Ensure all tracks have required properties
          const processedTracks = fetchedTracks.map(track => ({
            id: track.id || `track-${Math.random().toString(36).substr(2, 9)}`,
            title: track.title || "Untitled Track",
            artist: track.artist || "Unknown Artist",
            coverUrl: track.coverUrl || "/placeholder.svg",
            duration: track.duration || "0:00",
            blobId: track.blobId || ""
          }));
          
          setTracks(processedTracks);
        } else {
          console.warn("No tracks found or invalid data format", fetchedTracks);
          // Keep using the fallback tracks
        }
      } catch (error) {
        console.error("Failed to fetch tracks:", error);
        setError("Failed to load tracks. Using sample data instead.");
        // Keep using the fallback tracks
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);  const handlePlayPause = (track: Track) => {
    if (!audioRef.current) return;

    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      if (track.blobId) {
        audioRef.current.src = `https://aggregator.walrus-testnet.walrus.space/v1/blobs/${track.blobId}`;
        audioRef.current.play();
        setCurrentTrack(track);
        setIsPlaying(true);
      } else {
        // For fallback tracks or tracks without blob IDs
        console.info("Demo track (no audio available):", track);
        setCurrentTrack(track);
        setIsPlaying(true);
        // Simulate stopping after 3 seconds for demo tracks
        setTimeout(() => setIsPlaying(false), 3000);
      }
    }
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >          <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Trending</span> Tracks
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover the hottest tracks on the Bluetune platform. Support artists directly through the blockchain.
          </p>
          {error && (
            <p className="text-orange-400 mt-2 text-sm">{error}</p>
          )}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-black/40 border border-gray-800 p-4 rounded-lg animate-pulse">
                <CardContent>
                  <div className="w-full h-40 bg-gray-800 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="h-6 bg-gray-800 w-24 rounded mb-2"></div>
                      <div className="h-4 bg-gray-800 w-16 rounded"></div>
                    </div>
                    <div className="h-10 w-10 bg-gray-800 rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track) => (
              <Card key={track.id} className="bg-black/40 border border-gray-800 p-4 rounded-lg">
                <CardContent>
                  <img src={track.coverUrl || "/placeholder.svg"} alt={track.title} className="w-full h-40 object-cover rounded" />
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <h3 className="text-white text-lg font-bold">{track.title || "Untitled"}</h3>
                      <p className="text-gray-400 text-sm">{track.artist || "Unknown Artist"}</p>
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
            ))}          </div>
        )}

        {/* Audio Element */}
        <audio
          ref={audioRef}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          className="hidden"
        />      </div>
    </section>
  );
}
