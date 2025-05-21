"use client";

import { useState, useRef, useEffect } from "react";
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
	Grid,
	List,
	UserCircle,
	Play,
	Pause,
	BarChart2,
	Upload,
	Calendar,
	Users,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useWallet } from "@suiet/wallet-kit";
import { EnhancedTrackGrid } from "@/components/enhanced-track-grid";
import { EnhancedMusicPlayer } from "@/components/enhanced-music-player";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
	const { connected, address } = useWallet();
	const [activeTab, setActiveTab] = useState("uploads");
	const [currentTrack, setCurrentTrack] = useState<any>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [viewMode, setViewMode] = useState<"grid" | "list">("list");
	const [currentPlaylist, setCurrentPlaylist] = useState<any[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [loading, setLoading] = useState(false);

	const audioRef = useRef<HTMLAudioElement>(null);
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
		walletBalance: "1,234 SUI",
	};

	const uploads = [
		{
			id: "1",
			title: "Decentralized Dreams",
			artist: "Web3 Music Lover",
			genre: "electronic",
			plays: 12453,
			duration: "3:45",
			coverUrl: "/placeholder.jpg",
			uploadDate: "2023-09-10T14:32:45Z",
			blobId:
				"0x7a59c632c5a29ef4d0e825c6d2d9b2bdc5f2f4e3a1b0c9d8e7f6a5b4c3d2e1f0",
		},
		{
			id: "2",
			title: "Blockchain Beats",
			artist: "Web3 Music Lover",
			genre: "hiphop",
			plays: 8721,
			duration: "4:20",
			coverUrl: "/placeholder.jpg",
			uploadDate: "2023-08-15T09:21:33Z",
			blobId:
				"0x8b6ad743d6b39f05e1f936c7d3e0936ed4f3f5f4a2b1c0d9e8f7a6b5c4d3e2f1",
		},
		{
			id: "3",
			title: "Web3 Wonders",
			artist: "Web3 Music Lover",
			genre: "pop",
			plays: 5432,
			duration: "3:12",
			coverUrl: "/placeholder.jpg",
			uploadDate: "2023-07-22T16:45:12Z",
			blobId:
				"0x9c7be854f7c4a016f2g047d8e1f047fe5g4g6g5a3b2c1d0e9f8a7b6c5d4e3f2",
		},
	];

	const favorites = [
		{
			id: "4",
			title: "Wallet Wonders",
			artist: "DeFi Sounds",
			genre: "ambient",
			plays: 6543,
			duration: "2:58",
			coverUrl: "/placeholder.jpg",
			uploadDate: "2023-06-05T10:15:30Z",
			blobId: "0xa8d9c7b6e5f4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0",
		},
		{
			id: "5",
			title: "Smart Contract Symphony",
			artist: "Crypto Beats",
			genre: "electronic",
			plays: 9876,
			duration: "3:37",
			coverUrl: "/placeholder.jpg",
			uploadDate: "2023-05-18T08:22:11Z",
			blobId: "0xb9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0",
		},
	];

	const getTracksForActiveTab = () => {
		if (activeTab === "uploads") return uploads;
		if (activeTab === "favorites") return favorites;
		return [];
	};

	const handlePlayTrack = (track: any) => {
		if (!audioRef.current) return;

		const currentTracks = getTracksForActiveTab();
		setCurrentPlaylist(currentTracks);

		if (currentTrack?.id === track.id) {
			if (isPlaying) {
				audioRef.current.pause();
				setIsPlaying(false);
			} else {
				audioRef.current.play();
				setIsPlaying(true);
			}
		} else {
			// Find the index of the track in the playlist
			const trackIndex = currentTracks.findIndex((t) => t.id === track.id);
			setCurrentIndex(trackIndex >= 0 ? trackIndex : 0);

			audioRef.current.src = `https://aggregator.walrus-testnet.walrus.space/v1/blobs/${track.blobId}`;
			audioRef.current.play();
			setCurrentTrack(track);
			setIsPlaying(true);
		}
	};

	const handleNextTrack = () => {
		if (!currentPlaylist.length || currentIndex >= currentPlaylist.length - 1)
			return;

		const nextIndex = currentIndex + 1;
		const nextTrack = currentPlaylist[nextIndex];
		setCurrentIndex(nextIndex);

		if (audioRef.current) {
			audioRef.current.src = `https://aggregator.walrus-testnet.walrus.space/v1/blobs/${nextTrack.blobId}`;
			audioRef.current.play();
			setCurrentTrack(nextTrack);
			setIsPlaying(true);
		}
	};

	const handlePreviousTrack = () => {
		if (!currentPlaylist.length || currentIndex <= 0) return;

		const prevIndex = currentIndex - 1;
		const prevTrack = currentPlaylist[prevIndex];
		setCurrentIndex(prevIndex);

		if (audioRef.current) {
			audioRef.current.src = `https://aggregator.walrus-testnet.walrus.space/v1/blobs/${prevTrack.blobId}`;
			audioRef.current.play();
			setCurrentTrack(prevTrack);
			setIsPlaying(true);
		}
	};

	const handleAddToPlaylist = (track: any) => {
		console.log("Add to playlist:", track.title);
		// Implement playlist functionality
	};

	const handleDownload = (track: any) => {
		console.log("Download:", track.title);
		window.open(
			`https://aggregator.walrus-testnet.walrus.space/v1/blobs/${track.blobId}`,
			"_blank"
		);
	};
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

			{/* Hero Banner */}
			<div className="relative h-64 md:h-96 overflow-hidden bg-gradient-to-r from-blue-900 to-purple-900">
				<Image
					src={userProfile.coverUrl}
					alt="Profile cover"
					fill
					style={{ objectFit: "cover" }}
					className="opacity-60"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>

				<Button
					variant="outline"
					size="sm"
					className="absolute top-4 right-4 border-white/20 bg-black/30 backdrop-blur-sm hover:bg-black/50"
				>
					<Edit className="h-4 w-4 mr-2" />
					Edit Cover
				</Button>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				{/* Profile Header */}
				<div className="flex flex-col md:flex-row md:items-end gap-6 -mt-20 mb-10">
					<div className="relative">
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
						<Button
							variant="outline"
							size="icon"
							className="absolute bottom-0 right-0 h-8 w-8 rounded-full border-blue-500/30 bg-black/70 hover:bg-black/90"
						>
							<Edit className="h-3.5 w-3.5" />
						</Button>
					</div>

					<div className="md:mb-2 flex-1">
						<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
							<div>
								<h1 className="text-3xl font-bold text-white">
									{userProfile.name}
								</h1>
								<p className="text-gray-200 mb-2">{userProfile.bio}</p>
								<div className="flex items-center gap-2 text-sm text-blue-300">
									<span>
										{address?.slice(0, 8)}...{address?.slice(-6)}
									</span>
									<Button
										variant="outline"
										size="sm"
										className="h-7 gap-1 border-blue-500/30 hover:border-blue-400"
									>
										<ExternalLink size={14} />
										View on Explorer
									</Button>
								</div>
							</div>

							<div className="flex gap-3">
								<Button className="bg-blue-600 hover:bg-blue-500">
									<Upload className="h-4 w-4 mr-2" />
									Upload Track
								</Button>
								<Button
									variant="outline"
									className="border-blue-500/30 hover:border-blue-400"
								>
									<Edit className="h-4 w-4 mr-2" />
									Edit Profile
								</Button>
							</div>
						</div>

						<div className="flex gap-6 mt-4">
							<div className="flex items-center gap-1">
								<Badge className="bg-blue-900/40">{userProfile.uploads}</Badge>
								<span className="text-sm text-gray-400">Uploads</span>
							</div>
							<div className="flex items-center gap-1">
								<Badge className="bg-blue-900/40">
									{userProfile.followers}
								</Badge>
								<span className="text-sm text-gray-400">Followers</span>
							</div>
							<div className="flex items-center gap-1">
								<Badge className="bg-blue-900/40">
									{userProfile.following}
								</Badge>
								<span className="text-sm text-gray-400">Following</span>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
					{/* Sidebar */}
					<div className="md:col-span-1">
						<Card className="bg-black/40 backdrop-blur-sm border-blue-900/50 overflow-hidden">
							<CardContent className="p-5">
								<div className="flex items-center justify-between mb-4">
									<h3 className="font-medium text-white">Profile</h3>
									<Settings size={16} className="text-gray-500" />
								</div>

								<div className="space-y-4">
									<div className="bg-blue-900/20 rounded-lg p-4">
										<div className="flex items-center justify-between mb-2">
											<span className="text-gray-400 text-sm">
												Wallet Balance
											</span>
											<Badge className="bg-green-800/60 text-green-300">
												{userProfile.walletBalance}
											</Badge>
										</div>
										<Button className="w-full bg-blue-600 hover:bg-blue-500 mt-1">
											Add Funds
										</Button>
									</div>

									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<UserCircle size={16} className="text-gray-500" />
												<span className="text-gray-400">Member Since</span>
											</div>
											<span className="font-medium text-white">
												{userProfile.joinDate}
											</span>
										</div>

										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<BarChart2 size={16} className="text-gray-500" />
												<span className="text-gray-400">Total Plays</span>
											</div>
											<span className="font-medium text-white">26,876</span>
										</div>

										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Users size={16} className="text-gray-500" />
												<span className="text-gray-400">Followers</span>
											</div>
											<span className="font-medium text-white">
												{userProfile.followers}
											</span>
										</div>

										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Calendar size={16} className="text-gray-500" />
												<span className="text-gray-400">Last Upload</span>
											</div>
											<span className="font-medium text-white">3 days ago</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Main Content */}
					<div className="md:col-span-2 lg:col-span-3">
						<Tabs
							value={activeTab}
							onValueChange={setActiveTab}
							className="w-full"
						>
							<div className="flex items-center justify-between mb-4">
								<TabsList>
									<TabsTrigger value="uploads">Uploads</TabsTrigger>
									<TabsTrigger value="favorites">Favorites</TabsTrigger>
									<TabsTrigger value="playlists">Playlists</TabsTrigger>
									<TabsTrigger value="followers">Followers</TabsTrigger>
								</TabsList>

								<ToggleGroup
									type="single"
									value={viewMode}
									onValueChange={(value) =>
										value && setViewMode(value as "grid" | "list")
									}
								>
									<ToggleGroupItem value="grid" aria-label="Grid view">
										<Grid className="h-4 w-4" />
									</ToggleGroupItem>
									<ToggleGroupItem value="list" aria-label="List view">
										<List className="h-4 w-4" />
									</ToggleGroupItem>
								</ToggleGroup>
							</div>

							<TabsContent value="uploads">
								{loading ? (
									<div className="space-y-4">
										{Array.from({ length: 3 }).map((_, idx) => (
											<Skeleton key={idx} className="h-20 w-full" />
										))}
									</div>
								) : uploads.length > 0 ? (
									<EnhancedTrackGrid
										tracks={uploads}
										onPlay={handlePlayTrack}
										currentTrack={currentTrack}
										isPlaying={isPlaying}
										onAddToPlaylist={handleAddToPlaylist}
										onDownload={handleDownload}
										view={viewMode}
									/>
								) : (
									<div className="p-8 text-center bg-black/20 rounded-md border border-blue-900/30">
										<Music
											size={48}
											className="mx-auto text-blue-500/50 mb-3"
										/>
										<h3 className="text-xl font-medium text-white mb-2">
											No uploads yet
										</h3>
										<p className="text-gray-400 mb-4">
											Share your music with the world
										</p>
										<Button className="bg-blue-600 hover:bg-blue-500">
											<Upload className="h-4 w-4 mr-2" />
											Upload First Track
										</Button>
									</div>
								)}
							</TabsContent>

							<TabsContent value="favorites">
								{loading ? (
									<div className="space-y-4">
										{Array.from({ length: 3 }).map((_, idx) => (
											<Skeleton key={idx} className="h-20 w-full" />
										))}
									</div>
								) : favorites.length > 0 ? (
									<EnhancedTrackGrid
										tracks={favorites}
										onPlay={handlePlayTrack}
										currentTrack={currentTrack}
										isPlaying={isPlaying}
										onAddToPlaylist={handleAddToPlaylist}
										onDownload={handleDownload}
										view={viewMode}
									/>
								) : (
									<div className="p-8 text-center bg-black/20 rounded-md border border-blue-900/30">
										<Heart
											size={48}
											className="mx-auto text-blue-500/50 mb-3"
										/>
										<h3 className="text-xl font-medium text-white mb-2">
											No favorite tracks yet
										</h3>
										<p className="text-gray-400 mb-4">
											Explore and like tracks to add them to your favorites
										</p>
										<Link href="/explore">
											<Button className="bg-blue-600 hover:bg-blue-500">
												Explore Music
											</Button>
										</Link>
									</div>
								)}
							</TabsContent>

							<TabsContent value="playlists">
								<div className="p-8 text-center bg-black/20 rounded-md border border-blue-900/30">
									<ListMusic
										size={48}
										className="mx-auto text-blue-500/50 mb-3"
									/>
									<h3 className="text-xl font-medium text-white mb-2">
										No playlists yet
									</h3>
									<p className="text-gray-400 mb-4">
										Create playlists to organize your favorite tracks
									</p>
									<Button className="bg-blue-600 hover:bg-blue-500">
										Create First Playlist
									</Button>
								</div>
							</TabsContent>

							<TabsContent value="followers">
								<div className="p-8 text-center bg-black/20 rounded-md border border-blue-900/30">
									<Users size={48} className="mx-auto text-blue-500/50 mb-3" />
									<h3 className="text-xl font-medium text-white mb-2">
										{userProfile.followers} Followers
									</h3>
									<p className="text-gray-400 mb-4">
										People following your content
									</p>
									<Button className="bg-blue-600 hover:bg-blue-500">
										Find Friends
									</Button>
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>

			{/* Audio Element */}
			<audio
				ref={audioRef}
				onEnded={() => setIsPlaying(false)}
				onPause={() => setIsPlaying(false)}
				onPlay={() => setIsPlaying(true)}
				className="hidden"
			/>

			{/* Music Player */}
			{currentTrack && (
				<EnhancedMusicPlayer
					track={currentTrack}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					onClose={() => setCurrentTrack(null)}
					onNext={currentPlaylist.length > 1 ? handleNextTrack : undefined}
					onPrevious={
						currentPlaylist.length > 1 ? handlePreviousTrack : undefined
					}
					playlist={currentPlaylist}
					currentIndex={currentIndex}
					audioRef={audioRef}
				/>
			)}

			<Footer />
		</main>
	);
}
