"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Upload, Share2, DollarSign } from "lucide-react";
import { OptimizedImage } from "./ui/optimized-image";
import { images } from "@/config/images";

export function HowItWorks() {
	const steps = [
		{
			icon: <Upload className="h-8 w-8 text-blue-400" />,
			title: "Upload",
			description: "Upload your music as blobs on the Walrus storage system.",
			image: images.howItWorks[0],
		},
		{
			icon: <Share2 className="h-8 w-8 text-purple-400" />,
			title: "Share",
			description:
				"Share your music with the community and build your fanbase.",
			image: images.howItWorks[1],
		},
		{
			icon: <DollarSign className="h-8 w-8 text-blue-400" />,
			title: "Earn",
			description: "Receive direct payments in tokens for every stream.",
			image: images.howItWorks[2],
		},
	];

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<section className="py-20 bg-black/50">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
						How{" "}
						<span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
							Bluetune
						</span>{" "}
						Works
					</h2>
					<p className="text-gray-300 max-w-2xl mx-auto">
						Our decentralized platform revolutionizes how music is shared,
						streamed, and monetized.
					</p>
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-3 gap-8"
				>
					{steps.map((step, index) => (
						<motion.div key={index} variants={item}>
							<Card className="bg-black/40 backdrop-blur-sm border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 h-full overflow-hidden">
								<CardContent className="p-0">
									<div className="relative aspect-video">
										<OptimizedImage
											src={step.image.url}
											alt={step.image.alt}
											width={600}
											height={400}
											className="object-cover"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
									</div>
									<div className="p-6 text-center">
										<div className="mb-4 p-3 rounded-full bg-blue-900/30 inline-block">
											{step.icon}
										</div>
										<h3 className="text-xl font-bold mb-2">{step.title}</h3>
										<p className="text-gray-400">{step.description}</p>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
