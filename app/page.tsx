import { FeaturedArtists } from "@/components/featured-artists";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { TrendingTracksFallback } from "@/components/trending-tracks-fallback";
import { FeatureHighlights } from "@/components/feature-highlights";
import { Testimonials } from "@/components/testimonials";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { ClientOnly } from "@/components/client-only";

// Using static, server-friendly components to avoid client API calls during build
export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
			<Header />
			<HeroSection />
			<FeatureHighlights />
			{/* Use the static fallback version for SSG */}
			<TrendingTracksFallback />
			<HowItWorks />
			<ClientOnly>
				<Testimonials />
			</ClientOnly>
			<ClientOnly>
				<FeaturedArtists />
			</ClientOnly>
			<FAQSection />
			<CTASection />
			<Footer />
		</main>
	);
}
