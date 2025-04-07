"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
	{
		question: "What makes Bluetune different from traditional music platforms?",
		answer:
			"Bluetune is built on Sui blockchain and uses Walrus Protocol for decentralized storage, giving artists true ownership of their music. Artists receive direct payments in WAL/SUI tokens with each stream, eliminating middlemen and ensuring fair compensation.",
	},
	{
		question: "How do artists get paid on Bluetune?",
		answer:
			"Artists receive micro-payments directly to their Sui wallet in WAL/SUI tokens each time their track is streamed. The payment system is transparent, automatic, and gives artists significantly higher revenue than traditional platforms.",
	},
	{
		question: "What audio file formats are supported?",
		answer:
			"Bluetune supports most common audio formats including MP3, WAV, FLAC, AAC, and OGG. Files are stored as blobs on the Walrus Protocol and streamed efficiently using HTTP Range requests.",
	},
	{
		question: "Do I need a wallet to listen to music on Bluetune?",
		answer:
			"While you can browse and listen to some tracks without a wallet, connecting a Sui wallet gives you full access to features like creating playlists, following artists, and supporting creators.",
	},
	{
		question: "What is the difference between permanent and deletable storage?",
		answer:
			"Permanent storage ensures your music will be available forever on the Walrus Protocol, while deletable storage allows you to reclaim the storage space later. Permanent storage costs slightly more but is ideal for official releases.",
	},
];

export function FAQSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="py-20 bg-black">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
						Frequently{" "}
						<span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
							Asked
						</span>{" "}
						Questions
					</h2>
					<p className="text-gray-300 max-w-2xl mx-auto">
						Get answers to common questions about Bluetune's decentralized music
						streaming platform.
					</p>
				</motion.div>

				<div className="max-w-3xl mx-auto">
					{faqs.map((faq, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="mb-4"
						>
							<button
								onClick={() => toggleFAQ(index)}
								className={`w-full text-left p-6 rounded-lg flex justify-between items-center transition-all
                  ${
										openIndex === index
											? "bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30"
											: "bg-black/40 border border-blue-900/30 hover:border-blue-500/30"
									}`}
							>
								<span className="font-medium text-lg">{faq.question}</span>
								{openIndex === index ? (
									<ChevronUp className="h-5 w-5 text-blue-400" />
								) : (
									<ChevronDown className="h-5 w-5 text-gray-400" />
								)}
							</button>

							{openIndex === index && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.3 }}
									className="bg-blue-900/10 p-6 rounded-b-lg border-x border-b border-blue-900/30"
								>
									<p className="text-gray-300">{faq.answer}</p>
								</motion.div>
							)}
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
