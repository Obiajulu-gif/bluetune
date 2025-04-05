"use client";

import { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ConnectWalletPrompt } from "@/components/connect-wallet-prompt";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
	Edit,
	Music,
	Heart,
	ListMusic,
	Clock,
	Settings,
	ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useWallet } from "@/hooks/use-wallet";

export default function ProfilePage() {
	const { isConnected, walletAddress } = useWallet();
	const [activeTab, setActiveTab] = useState("uploads");

	// Mock data
	const userProfile = {
		name: "Web3 Music Lover",
		bio: "Passionate about decentralized music and supporting independent artists.",
		avatarUrl: "/placeholder.svg",
		coverUrl: "/placeholder.svg",
		joinDate: "January 2023",
		uploads: 5,
		followers: 23,
		following: 47,
	};

	const uploads = [
		{
			id: "1",
			title: "Decentralized Dreams",
			plays: 12453,
			uploadDate: "2023-09-10T14:32:45Z",
		},
		{
			id: "2",
			title: "Blockchain Beats",
			plays: 8721,
			uploadDate: "2023-08-15T09:21:33Z",
		},
		{
			id: "3",
			title: "Web3 Wonders",
			plays: 5432,
			uploadDate: "2023-07-22T16:45:12Z",
		},
	];

	if (!isConnected) {
		return (
			<main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
				<Header />
				<div className="container mx-auto px-4 pt-32 pb-20">
					<ConnectWalletPrompt message="Connect your wallet to view your profile" />
				</div>
				<Footer />
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
			<Header />

			<div className="relative h-64 md:h-80 overflow-hidden">
				<Image
					src={userProfile.coverUrl}
					alt="Profile cover"
					layout="fill"
					objectFit="cover"
				/>
			</div>

			<div className="container mx-auto px-4 -mt-20 relative z-10">
				<div className="flex items-end gap-6 mb-8">
					<Avatar className="h-32 w-32 border-4 border-black">
						<AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
						<AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
					</Avatar>

					<div>
						<h1 className="text-3xl font-bold">{userProfile.name}</h1>
						<p>{userProfile.bio}</p>
					</div>
				</div>

				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<TabsList>
						<TabsTrigger value="uploads">Uploads</TabsTrigger>
						<TabsTrigger value="favorites">Favorites</TabsTrigger>
					</TabsList>

					<TabsContent value="uploads">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{uploads.map((track) => (
								<motion.div
									key={track.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
								>
									<Link href={`/track/${track.id}`}>
										<Card>
											<CardContent>
												<div>
													<h3>{track.title}</h3>
													<p>{track.plays.toLocaleString()} plays</p>
													<p>
														{new Date(track.uploadDate).toLocaleDateString()}
													</p>
												</div>
											</CardContent>
										</Card>
									</Link>
								</motion.div>
							))}
						</div>
					</TabsContent>
				</Tabs>
			</div>

			<Footer />
		</main>
	);
}
