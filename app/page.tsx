import { FeaturedArtists } from "@/components/featured-artists"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { TrendingTracks } from "@/components/trending-tracks"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <Header />
      <HeroSection />
      <TrendingTracks />
      <HowItWorks />
      <FeaturedArtists />
      <Footer />
    </main>
  )
}

