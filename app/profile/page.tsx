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
import { useWallet } from "@suiet/wallet-kit";

export default function ProfilePage() {
	const { connected, address } = useWallet();
	const [activeTab, setActiveTab] = useState("uploads");

	// Mock data
	const userProfile = {
		name: "Web3 Music Lover",
		bio: "Passionate about decentralized music and supporting independent artists.",
		avatarUrl: "/placeholder-user.jpg",
		coverUrl: "/placeholder.jpg",
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

	if (!connected) {
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
			<div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-r from-blue-900 to-purple-900">
				<Image
					src={userProfile.coverUrl}
					alt="Profile cover"
					fill
					style={{ objectFit: "cover" }}
					className="opacity-60"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
			</div>

			<div className="container mx-auto px-4 -mt-20 relative z-10">
				<div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
					<Avatar className="h-32 w-32 border-4 border-blue-500/30 shadow-lg bg-black/50 backdrop-blur-sm">
						<AvatarImage 
							src={userProfile.avatarUrl} 
							alt={userProfile.name} 
							className="object-cover"
						/>
						<AvatarFallback className="bg-blue-900 text-white text-2xl">
							{userProfile.name.charAt(0)}
						</AvatarFallback>
					</Avatar>

					<div className="md:mb-2">
						<h1 className="text-3xl font-bold text-white">{userProfile.name}</h1>
						<p className="text-gray-200 mb-2">{userProfile.bio}</p>
						<div className="flex items-center gap-2 text-sm text-blue-300">
							<span>{address?.slice(0, 8)}...{address?.slice(-6)}</span>
							<Button variant="outline" size="sm" className="h-7 gap-1 border-blue-500/30 hover:border-blue-400">
								<ExternalLink size={14} />
								View on Explorer
							</Button>
						</div>
					</div>
				</div>

				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<TabsList>
						<TabsTrigger value="uploads">Uploads</TabsTrigger>
						<TabsTrigger value="favorites">Favorites</TabsTrigger>
					</TabsList>
					
					<TabsContent value="uploads">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
							{uploads.map((track) => (
								<motion.div
									key={track.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
								>
									<Link href={`/track/${track.id}`}>
										<Card className="overflow-hidden bg-black/40 backdrop-blur-sm border-blue-900/50 hover:border-blue-500/50 transition-all duration-300">
											<div className="flex">
												<div className="w-24 h-24 bg-blue-900/30 relative">
													<Image
														src="/placeholder.jpg"
														alt={track.title}
														width={96}
														height={96}
														className="object-cover h-full"
													/>
												</div>
												<CardContent className="p-4 flex-1">
													<div>
														<h3 className="font-medium text-white">{track.title}</h3>
														<div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
															<Music size={14} />
															<span>{track.plays.toLocaleString()} plays</span>
														</div>
														<div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
															<Clock size={14} />
															<span>{new Date(track.uploadDate).toLocaleDateString()}</span>
														</div>
													</div>
												</CardContent>
											</div>
										</Card>
									</Link>
								</motion.div>
							))}
						</div>
					</TabsContent>

					<TabsContent value="favorites">
						<div className="mt-6 p-8 text-center bg-black/20 rounded-md border border-blue-900/30">
							<Music size={48} className="mx-auto text-blue-500/50 mb-3" />
							<h3 className="text-xl font-medium text-white mb-2">No favorite tracks yet</h3>
							<p className="text-gray-400">Explore and like tracks to add them to your favorites</p>
							<Button className="mt-4 bg-blue-600 hover:bg-blue-500">
								Explore Music
							</Button>
						</div>
					</TabsContent>
				</Tabs>
				
				<div className="mt-8 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card className="bg-black/40 backdrop-blur-sm border-blue-900/50 p-4">
						<div className="flex items-center justify-between mb-2">
							<h3 className="font-medium text-white">Statistics</h3>
							<Settings size={16} className="text-gray-500" />
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<span className="text-gray-400">Uploads</span>
								<span className="font-medium text-white">{userProfile.uploads}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-400">Followers</span>
								<span className="font-medium text-white">{userProfile.followers}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-400">Following</span>
								<span className="font-medium text-white">{userProfile.following}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-400">Joined</span>
								<span className="font-medium text-white">{userProfile.joinDate}</span>
							</div>
						</div>
					</Card>
				</div>
			</div>

			<Footer />
		</main>
	);
}
