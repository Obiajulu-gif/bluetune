import { FeaturedArtists } from "@/components/featured-artists";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { TrendingTracks } from "@/components/trending-tracks";
import { FeatureHighlights } from "@/components/feature-highlights";
import { Testimonials } from "@/components/testimonials";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
			<Header />
			<HeroSection />
			<FeatureHighlights />
			<TrendingTracks />
			<HowItWorks />
			<Testimonials />
			<FeaturedArtists />
			<FAQSection />
			<CTASection />
			<Footer />
		</main>
	);
}
