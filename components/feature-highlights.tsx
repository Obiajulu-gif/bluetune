"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
	Music,
	Upload,
	Shield,
	Coins,
	Search,
	User,
	Database,
	Bot,
} from "lucide-react";

const features = [
	{
		icon: <Upload className="h-10 w-10 text-blue-400" />,
		title: "Upload & Store Music",
		description:
			"Upload songs as blobs using Walrus Protocol for permanent or deletable storage with rich metadata.",
	},
	{
		icon: <Music className="h-10 w-10 text-purple-400" />,
		title: "Audio Streaming",
		description:
			"Stream high-quality music directly from decentralized storage via HTTP Range requests.",
	},
	{
		icon: <Shield className="h-10 w-10 text-green-400" />,
		title: "Decentralized Ownership",
		description:
			"Each song is linked to a Sui Blob Object which artists own, with verifiable on-chain proof.",
	},
	{
		icon: <Coins className="h-10 w-10 text-yellow-400" />,
		title: "WAL/SUI Monetization",
		description:
			"Artists receive micro-rewards with every stream via WAL/SUI tokens for direct support.",
	},
	{
		icon: <Search className="h-10 w-10 text-red-400" />,
		title: "Discover & Explore",
		description:
			"Find new music through powerful search and filters based on blob attributes.",
	},
	{
		icon: <User className="h-10 w-10 text-cyan-400" />,
		title: "User Profiles",
		description:
			"Create your profile tied to your Sui wallet to follow artists and like tracks.",
	},
	{
		icon: <Bot className="h-10 w-10 text-amber-400" />,
		title: "AI Recommendations",
		description:
			"Get personalized music recommendations based on your listening history.",
	},
	{
		icon: <Database className="h-10 w-10 text-fuchsia-400" />,
		title: "Reclaimable Storage",
		description:
			"Artists can upload deletable versions of tracks and reclaim storage space.",
	},
];

export function FeatureHighlights() {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<section className="py-20 relative overflow-hidden bg-gradient-to-b from-blue-950/30 to-black">
			{/* Decorative elements */}
			<div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
			<div className="absolute -top-64 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
			<div className="absolute -bottom-64 -left-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6">
						Revolutionary{" "}
						<span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
							Features
						</span>
					</h2>
					<p className="text-gray-300 max-w-2xl mx-auto">
						Bluetune combines cutting-edge blockchain technology with seamless
						user experience to create the future of decentralized music
						streaming.
					</p>
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
				>
					{features.map((feature, index) => (
						<motion.div key={index} variants={item}>
							<Card className="bg-black/40 backdrop-blur-sm border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 h-full">
								<CardContent className="p-6 flex flex-col items-center text-center">
									<div className="mb-4 p-3 rounded-full bg-blue-900/30">
										{feature.icon}
									</div>
									<h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
										{feature.title}
									</h3>
									<p className="text-gray-400">{feature.description}</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
