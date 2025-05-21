import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

// Fallback tracks for server-side rendering
const fallbackTracks = [
  {
    id: "1",
    title: "Digital Dreams",
    artist: "Blockchain Beats",
    coverUrl: "/placeholder.svg",
    duration: "3:45",
  },
  {
    id: "2",
    title: "Crypto Vibes",
    artist: "Web3 Collective",
    coverUrl: "/placeholder.svg",
    duration: "4:20",
  },
  {
    id: "3",
    title: "Decentralized",
    artist: "Token Tunes",
    coverUrl: "/placeholder.svg",
    duration: "3:12",
  },
  {
    id: "4",
    title: "Wallet Wonders",
    artist: "DeFi Sounds",
    coverUrl: "/placeholder.svg",
    duration: "2:58",
  }
];

export function TrendingTracksFallback() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Trending</span> Tracks
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover the hottest tracks on the Bluetune platform. Support artists directly through the blockchain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fallbackTracks.map((track) => (
            <Card key={track.id} className="bg-black/40 border border-gray-800 p-4 rounded-lg">
              <CardContent>
                <img src={track.coverUrl} alt={track.title} className="w-full h-40 object-cover rounded" />
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <h3 className="text-white text-lg font-bold">{track.title}</h3>
                    <p className="text-gray-400 text-sm">{track.artist}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center"
                  >
                    <Play className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
