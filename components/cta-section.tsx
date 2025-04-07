"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileAudio, Users } from "lucide-react";
import Link from "next/link";

export function CTASection() {
	return (
		<section className="py-20 relative overflow-hidden bg-gradient-to-b from-blue-950/20 to-black">
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
				<div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
			</div>

			<div className="container mx-auto px-4 relative">
				<div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-blue-500/20">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center mb-8"
					>
						<h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
							Ready to{" "}
							<span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
								Join the Revolution
							</span>
							?
						</h2>
						<p className="text-gray-300 max-w-2xl mx-auto">
							Whether you're an artist looking to take control of your music or
							a listener who wants to support creators directly, Bluetune is
							building the future of decentralized music streaming.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="flex flex-col sm:flex-row justify-center gap-4"
					>
						<Button
							size="lg"
							className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
							asChild
						>
							<Link href="/upload">
								<FileAudio className="mr-2 h-5 w-5" /> Upload Your Music
							</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
							asChild
						>
							<Link href="/explore">
								<Users className="mr-2 h-5 w-5" /> Join Community
							</Link>
						</Button>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
