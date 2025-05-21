"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Play,
	Pause,
	Heart,
	MoreHorizontal,
	ListMusic,
	Download,
	Share2,
	Clock,
	Music,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

type EnhancedTrackGridProps = {
	tracks: any[];
	onPlay: (track: any) => void;
	currentTrack: any;
	isPlaying: boolean;
	isLoading?: boolean;
	onAddToPlaylist?: (track: any) => void;
	onDownload?: (track: any) => void;
	view?: "grid" | "list";
};

export function EnhancedTrackGrid({
	tracks,
	onPlay,
	currentTrack,
	isPlaying,
	isLoading = false,
	onAddToPlaylist,
	onDownload,
	view = "grid",
}: EnhancedTrackGridProps) {
	const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);
	const [likedTracks, setLikedTracks] = useState<Record<string, boolean>>({});

	const toggleLike = (trackId: string, event: React.MouseEvent) => {
		event.stopPropagation();
		setLikedTracks((prev) => ({
			...prev,
			[trackId]: !prev[trackId],
		}));
	};

	const handleAddToPlaylist = (track: any, event: React.MouseEvent) => {
		event.stopPropagation();
		if (onAddToPlaylist) {
			onAddToPlaylist(track);
		}
	};

	const handleDownload = (track: any, event: React.MouseEvent) => {
		event.stopPropagation();
		if (onDownload) {
			onDownload(track);
		}
	};

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

	if (isLoading) {
		return (
			<div
				className={
					view === "grid"
						? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
						: "space-y-4"
				}
			>
				{Array.from({ length: 8 }).map((_, index) => (
					<div
						key={index}
						className={`animate-pulse ${
							view === "list" ? "flex items-center gap-4" : ""
						}`}
					>
						<div
							className={`bg-blue-900/30 ${
								view === "grid" ? "aspect-square" : "h-16 w-16"
							}`}
						></div>
						{view === "list" && (
							<div className="flex-1">
								<div className="h-5 bg-blue-900/30 w-2/3 mb-2 rounded"></div>
								<div className="h-4 bg-blue-900/30 w-1/3 rounded"></div>
							</div>
						)}
						{view === "grid" && (
							<div className="p-4">
								<div className="h-5 bg-blue-900/30 w-full mb-2 rounded"></div>
								<div className="h-4 bg-blue-900/30 w-2/3 mb-4 rounded"></div>
								<div className="flex justify-between">
									<div className="h-3 bg-blue-900/30 w-16 rounded"></div>
									<div className="h-8 bg-blue-900/30 w-16 rounded"></div>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		);
	}

	if (tracks.length === 0) {
		return (
			<div className="text-center py-16 bg-black/20 border border-blue-900/20 rounded-lg">
				<Music className="h-12 w-12 mx-auto text-blue-500/50 mb-4" />
				<h3 className="text-lg font-medium">No tracks found</h3>
				<p className="text-gray-400 mt-2">
					Try adjusting your filters or explore other categories
				</p>
			</div>
		);
	}

	// List view
	if (view === "list") {
		return (
			<motion.div
				variants={container}
				initial="hidden"
				animate="show"
				className="space-y-2"
			>
				{tracks.map((track) => (
					<motion.div key={track.id} variants={item}>
						<Card
							className={`bg-black/40 backdrop-blur-sm border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden ${
								currentTrack?.id === track.id ? "border-blue-500" : ""
							}`}
							onMouseEnter={() => setHoveredTrack(track.id)}
							onMouseLeave={() => setHoveredTrack(null)}
						>
							<CardContent className="p-0">
								<div
									className="flex items-center p-2 cursor-pointer"
									onClick={() => onPlay(track)}
								>
									<div className="relative flex-shrink-0 h-16 w-16 mr-4">
										<img
											src={track.coverUrl || "/placeholder.jpg"}
											alt={track.title}
											className="w-full h-full object-cover rounded"
										/>
										<div
											className={`absolute inset-0 bg-black/60 flex items-center justify-center rounded transition-opacity ${
												hoveredTrack === track.id ||
												(currentTrack?.id === track.id && isPlaying)
													? "opacity-100"
													: "opacity-0"
											}`}
										>
											{currentTrack?.id === track.id && isPlaying ? (
												<div className="flex space-x-1">
													<div className="w-1 h-8 bg-blue-500 animate-music-play-1 rounded-full"></div>
													<div className="w-1 h-8 bg-blue-500 animate-music-play-2 rounded-full"></div>
													<div className="w-1 h-8 bg-blue-500 animate-music-play-3 rounded-full"></div>
												</div>
											) : (
												<Play className="h-8 w-8 text-white" />
											)}
										</div>
									</div>

									<div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center md:justify-between">
										<div>
											<Link href={`/track/${track.id}`}>
												<h3 className="font-medium text-white hover:text-blue-400 transition-colors truncate">
													{track.title}
												</h3>
											</Link>
											<Link
												href={`/artist/${track.artist
													?.replace(/\s+/g, "-")
													.toLowerCase()}`}
											>
												<p className="text-sm text-gray-400 hover:text-blue-400 transition-colors truncate">
													{track.artist}
												</p>
											</Link>
										</div>

										<div className="flex items-center gap-3 mt-2 md:mt-0">
											<div className="hidden md:flex items-center gap-1 text-gray-500 text-sm">
												<Clock className="h-3 w-3" />
												<span>{track.duration}</span>
											</div>

											<div className="hidden md:flex items-center gap-1 text-gray-500 text-sm">
												<Play className="h-3 w-3" />
												<span>{track.plays?.toLocaleString()}</span>
											</div>

											{track.genre && (
												<Badge className="hidden md:inline-flex bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 text-xs">
													{track.genre}
												</Badge>
											)}

											<div className="flex items-center gap-1">
												<Button
													variant="ghost"
													size="icon"
													className={`h-8 w-8 ${
														likedTracks[track.id]
															? "text-red-500"
															: "text-gray-400 hover:text-red-400"
													}`}
													onClick={(e) => toggleLike(track.id, e)}
												>
													<Heart
														className={`h-4 w-4 ${
															likedTracks[track.id] ? "fill-red-500" : ""
														}`}
													/>
												</Button>

												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8 text-gray-400 hover:text-white"
														>
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent
														align="end"
														className="bg-black/90 backdrop-blur-md border-blue-900/50"
													>
														<DropdownMenuItem
															onClick={(e) => handleAddToPlaylist(track, e)}
															className="cursor-pointer"
														>
															<ListMusic className="h-4 w-4 mr-2" />
															<span>Add to Playlist</span>
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={(e) => handleDownload(track, e)}
															className="cursor-pointer"
														>
															<Download className="h-4 w-4 mr-2" />
															<span>Download</span>
														</DropdownMenuItem>
														<DropdownMenuItem className="cursor-pointer">
															<Share2 className="h-4 w-4 mr-2" />
															<span>Share</span>
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</motion.div>
		);
	}

	// Grid view (default)
	return (
		<motion.div
			variants={container}
			initial="hidden"
			animate="show"
			className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
		>
			{tracks.map((track) => (
				<motion.div key={track.id} variants={item}>
					<Card
						className={`bg-black/40 backdrop-blur-sm border-blue-900/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300 ${
							currentTrack?.id === track.id
								? "border-blue-500 shadow-lg shadow-blue-500/20"
								: ""
						}`}
						onMouseEnter={() => setHoveredTrack(track.id)}
						onMouseLeave={() => setHoveredTrack(null)}
					>
						<CardContent className="p-0">
							<div
								className="relative group cursor-pointer"
								onClick={() => onPlay(track)}
							>
								<img
									src={track.coverUrl || "/placeholder.jpg"}
									alt={track.title}
									className="w-full aspect-square object-cover"
								/>

								<div
									className={`absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 flex flex-col items-center justify-center transition-opacity ${
										hoveredTrack === track.id ||
										(currentTrack?.id === track.id && isPlaying)
											? "opacity-100"
											: "opacity-0"
									}`}
								>
									<Button
										variant="ghost"
										size="icon"
										className="h-16 w-16 rounded-full bg-blue-500/80 hover:bg-blue-600/80 text-white mb-4"
									>
										{currentTrack?.id === track.id && isPlaying ? (
											<Pause className="h-8 w-8" />
										) : (
											<Play className="h-8 w-8 ml-1" />
										)}
									</Button>

									{currentTrack?.id === track.id && isPlaying && (
										<div className="flex space-x-1 mt-2">
											<div className="w-1 h-8 bg-blue-500 animate-music-play-1 rounded-full"></div>
											<div className="w-1 h-8 bg-blue-500 animate-music-play-2 rounded-full"></div>
											<div className="w-1 h-8 bg-blue-500 animate-music-play-3 rounded-full"></div>
										</div>
									)}

									<div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center">
										<Button
											variant="ghost"
											size="icon"
											className={`h-8 w-8 ${
												likedTracks[track.id]
													? "text-red-500"
													: "text-white hover:text-red-400"
											}`}
											onClick={(e) => toggleLike(track.id, e)}
										>
											<Heart
												className={`h-4 w-4 ${
													likedTracks[track.id] ? "fill-red-500" : ""
												}`}
											/>
										</Button>

										<div className="flex gap-1">
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8 text-white hover:text-blue-400"
												onClick={(e) => {
													e.stopPropagation();
													if (onAddToPlaylist) onAddToPlaylist(track);
												}}
											>
												<ListMusic className="h-4 w-4" />
											</Button>

											<DropdownMenu>
												<DropdownMenuTrigger
													asChild
													onClick={(e) => e.stopPropagation()}
												>
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8 text-white hover:text-blue-400"
													>
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent
													align="end"
													className="bg-black/90 backdrop-blur-md border-blue-900/50"
												>
													<DropdownMenuItem
														onClick={(e) => handleAddToPlaylist(track, e)}
														className="cursor-pointer"
													>
														<ListMusic className="h-4 w-4 mr-2" />
														<span>Add to Playlist</span>
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={(e) => handleDownload(track, e)}
														className="cursor-pointer"
													>
														<Download className="h-4 w-4 mr-2" />
														<span>Download</span>
													</DropdownMenuItem>
													<DropdownMenuItem className="cursor-pointer">
														<Share2 className="h-4 w-4 mr-2" />
														<span>Share</span>
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</div>
								</div>

								{track.genre && (
									<div className="absolute top-2 left-2">
										<Badge className="bg-black/50 backdrop-blur-sm border-blue-500/30 text-blue-300 text-xs">
											{track.genre}
										</Badge>
									</div>
								)}
							</div>

							<div className="p-4">
								<Link href={`/track/${track.id}`}>
									<h3 className="font-bold text-lg mb-1 truncate hover:text-blue-400 transition-colors">
										{track.title}
									</h3>
								</Link>
								<Link
									href={`/artist/${track.artist
										?.replace(/\s+/g, "-")
										.toLowerCase()}`}
								>
									<p className="text-gray-400 text-sm mb-2 hover:text-blue-400 transition-colors truncate">
										{track.artist}
									</p>
								</Link>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2 text-xs text-gray-500">
										<Clock className="h-3 w-3" />
										<span>{track.duration}</span>
										<span className="text-gray-700">•</span>
										<span>{track.plays?.toLocaleString()} plays</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			))}
		</motion.div>
	);
}
