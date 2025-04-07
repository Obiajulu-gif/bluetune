"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
	{
		quote:
			"Bluetune has completely changed how I release and monetize my music. The direct payments from fans make a huge difference.",
		author: "Alex Rivera",
		role: "Electronic Music Producer",
		avatar: "/placeholder.svg?height=60&width=60",
	},
	{
		quote:
			"The audio quality is incredible, and knowing artists get paid fairly makes the experience even better.",
		author: "Mia Johnson",
		role: "Music Enthusiast",
		avatar: "/placeholder.svg?height=60&width=60",
	},
	{
		quote:
			"As an independent artist, Bluetune gives me full control over my music while reaching a global audience.",
		author: "David Chen",
		role: "Indie Musician",
		avatar: "/placeholder.svg?height=60&width=60",
	},
];

export function Testimonials() {
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
		<section className="py-20 bg-gradient-to-b from-black to-blue-950/30">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
						What Our{" "}
						<span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
							Community
						</span>{" "}
						Says
					</h2>
					<p className="text-gray-300 max-w-2xl mx-auto">
						Join thousands of artists and listeners who are already part of the
						decentralized music revolution.
					</p>
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-3 gap-8"
				>
					{testimonials.map((testimonial, index) => (
						<motion.div key={index} variants={item}>
							<Card className="bg-black/40 backdrop-blur-sm border-blue-900/50 hover:border-blue-400/50 transition-all duration-300 h-full overflow-hidden">
								<CardContent className="p-6 flex flex-col h-full">
									<Quote className="h-8 w-8 text-blue-400 mb-4 opacity-50" />
									<p className="text-gray-200 flex-grow italic mb-6">
										"{testimonial.quote}"
									</p>
									<div className="flex items-center">
										<Avatar className="h-12 w-12 border-2 border-blue-900/50">
											<AvatarImage
												src={testimonial.avatar}
												alt={testimonial.author}
											/>
											<AvatarFallback>
												{testimonial.author.charAt(0)}
											</AvatarFallback>
										</Avatar>
										<div className="ml-4">
											<p className="font-medium">{testimonial.author}</p>
											<p className="text-sm text-gray-400">
												{testimonial.role}
											</p>
										</div>
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
