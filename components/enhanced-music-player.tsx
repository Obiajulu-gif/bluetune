"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
	Play,
	Pause,
	SkipBack,
	SkipForward,
	Volume2,
	Volume1,
	VolumeX,
	Maximize2,
	Minimize2,
	Heart,
	Share2,
	ListMusic,
	PlusCircle,
	Download,
	Repeat,
	Shuffle,
	X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { OptimizedImage } from "./ui/optimized-image";
import { cn } from "@/lib/utils";

type MusicPlayerProps = {
	track: any;
	isPlaying: boolean;
	setIsPlaying: (isPlaying: boolean) => void;
	onClose: () => void;
	onNext?: () => void;
	onPrevious?: () => void;
	playlist?: any[];
	currentIndex?: number;
	audioRef?: React.RefObject<HTMLAudioElement>;
};

export function EnhancedMusicPlayer({
	track,
	isPlaying,
	setIsPlaying,
	onClose,
	onNext,
	onPrevious,
	playlist,
	currentIndex = 0,
	audioRef: externalAudioRef,
}: MusicPlayerProps) {
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(80);
	const [isMuted, setIsMuted] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [showVolumeControl, setShowVolumeControl] = useState(false);
	const [repeat, setRepeat] = useState(false);
	const [shuffle, setShuffle] = useState(false);
	const [isMiniplayer, setIsMiniplayer] = useState(false);
	const [showWaveform, setShowWaveform] = useState(false);
	const [isDraggingTime, setIsDraggingTime] = useState(false);

	const internalAudioRef = useRef<HTMLAudioElement | null>(null);
	const audioRef = externalAudioRef || internalAudioRef;
	const progressRef = useRef<HTMLDivElement>(null);
	const volumeRef = useRef<HTMLDivElement>(null);
	const waveformRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		// If no external audioRef is provided, set up the internal one
		if (!externalAudioRef && audioRef.current) {
			audioRef.current.volume = volume / 100;

			audioRef.current.addEventListener("loadedmetadata", () => {
				setDuration(audioRef.current?.duration || 0);
			});

			audioRef.current.addEventListener("timeupdate", () => {
				if (!isDraggingTime) {
					setCurrentTime(audioRef.current?.currentTime || 0);
				}
			});

			audioRef.current.addEventListener("ended", () => {
				if (repeat) {
					audioRef.current!.currentTime = 0;
					audioRef.current!.play();
				} else if (onNext && playlist && currentIndex < playlist.length - 1) {
					onNext();
				} else {
					setIsPlaying(false);
					setCurrentTime(0);
				}
			});
		}

		// For demo, estimate duration from the track data
		setDuration(
			Number.parseInt(track.duration?.split(":")[0] || "0") * 60 +
				Number.parseInt(track.duration?.split(":")[1] || "0")
		);

		// Clean up listeners
		return () => {
			if (!externalAudioRef && audioRef.current) {
				audioRef.current.pause();
			}
		};
	}, [
		track,
		setIsPlaying,
		externalAudioRef,
		repeat,
		onNext,
		playlist,
		currentIndex,
	]);

	useEffect(() => {
		if (audioRef.current) {
			if (isPlaying) {
				const playPromise = audioRef.current.play();
				if (playPromise !== undefined) {
					playPromise.catch(() => {
						setIsPlaying(false);
					});
				}
			} else {
				audioRef.current.pause();
			}
		}
	}, [isPlaying, setIsPlaying]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = isMuted ? 0 : volume / 100;
		}
	}, [volume, isMuted]);

	// Generate waveform visualization
	useEffect(() => {
		if (showWaveform && waveformRef.current) {
			const canvas = waveformRef.current;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				// Clear canvas
				ctx.clearRect(0, 0, canvas.width, canvas.height);

				// In a real implementation, this would use audio analysis data
				// For demo purposes, we're creating a random waveform
				const barCount = 70;
				const barWidth = canvas.width / barCount;
				const barGap = 2;
				const maxBarHeight = canvas.height * 0.8;

				ctx.fillStyle = currentTime / duration > 0.5 ? "#60a5fa" : "#3b82f6";

				for (let i = 0; i < barCount; i++) {
					// Create a pattern that resembles a waveform
					let barHeight;

					if (i < barCount * (currentTime / duration)) {
						// Bars representing the played portion
						barHeight =
							Math.sin(i * 0.2) * (maxBarHeight / 2) + maxBarHeight / 2;
						ctx.fillStyle = "#60a5fa";
					} else {
						// Bars representing the unplayed portion
						barHeight =
							Math.sin(i * 0.2) * (maxBarHeight / 3) + maxBarHeight / 3;
						ctx.fillStyle = "#3b82f6";
					}

					const x = i * (barWidth + barGap);
					const y = (canvas.height - barHeight) / 2;

					ctx.fillRect(x, y, barWidth, barHeight);
				}

				// Add playhead line
				const playheadX = (currentTime / duration) * canvas.width;
				ctx.fillStyle = "#f8fafc";
				ctx.fillRect(playheadX - 1, 0, 2, canvas.height);
			}
		}
	}, [showWaveform, currentTime, duration]);

	const handlePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	const handleSeek = (value: number[]) => {
		const newTime = value[0];
		setCurrentTime(newTime);
		if (audioRef.current) {
			audioRef.current.currentTime = newTime;
		}
	};

	const handleTimeUpdate = (time: number) => {
		if (!isDraggingTime) {
			setCurrentTime(time);
		}
	};

	const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!progressRef.current) return;

		const rect = progressRef.current.getBoundingClientRect();
		const percent = (e.clientX - rect.left) / rect.width;
		const newTime = percent * duration;

		handleSeek([newTime]);
	};

	const handleVolumeChange = (value: number[]) => {
		const newVolume = value[0];
		setVolume(newVolume);
		setIsMuted(newVolume === 0);
	};

	const handleVolumeBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!volumeRef.current) return;

		const rect = volumeRef.current.getBoundingClientRect();
		const percent = (e.clientX - rect.left) / rect.width;
		const newVolume = Math.round(percent * 100);

		handleVolumeChange([newVolume]);
	};

	const toggleMute = () => {
		setIsMuted(!isMuted);
	};

	const toggleExpandCollapse = () => {
		setIsExpanded(!isExpanded);
	};

	const toggleMiniplayer = () => {
		setIsMiniplayer(!isMiniplayer);
	};

	const toggleLike = () => {
		setIsLiked(!isLiked);
	};

	const toggleRepeat = () => {
		setRepeat(!repeat);
	};

	const toggleShuffle = () => {
		setShuffle(!shuffle);
	};

	const toggleWaveform = () => {
		setShowWaveform(!showWaveform);
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	// Mini player in corner
	if (isMiniplayer) {
		return (
			<motion.div
				initial={{ scale: 0.8, opacity: 0, y: 50, x: 50 }}
				animate={{ scale: 1, opacity: 1, y: 0, x: 0 }}
				className="fixed bottom-4 right-4 z-50"
			>
				<Card className="w-64 shadow-lg bg-black/90 backdrop-blur-md border-blue-900/50 overflow-hidden">
					<CardContent className="p-3">
						<div className="flex items-center gap-3">
							<div className="relative w-12 h-12 flex-shrink-0">
								<img
									src={track.CoverUrl || "/placeholder.jpg"}
									alt={track.title}
									className="w-full h-full object-cover rounded-md"
								/>
								{isPlaying && (
									<div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md">
										<div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
									</div>
								)}
							</div>

							<div className="flex-1 min-w-0">
								<h4 className="text-sm font-medium truncate">{track.title}</h4>
								<p className="text-xs text-gray-400 truncate">{track.artist}</p>
							</div>

							<div className="flex gap-1">
								<Button
									variant="ghost"
									size="icon"
									className="h-7 w-7 text-gray-400 hover:text-white"
									onClick={handlePlayPause}
								>
									{isPlaying ? (
										<Pause className="h-4 w-4" />
									) : (
										<Play className="h-4 w-4" />
									)}
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="h-7 w-7 text-gray-400 hover:text-white"
									onClick={toggleMiniplayer}
								>
									<Maximize2 className="h-4 w-4" />
								</Button>
							</div>
						</div>

						<div className="mt-2">
							<div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
								<div
									className="h-full bg-blue-500"
									style={{ width: `${(currentTime / duration) * 100}%` }}
								></div>
							</div>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		);
	}

	return (
		<AnimatePresence>
			<motion.div
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 100, opacity: 0 }}
				className={`fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-blue-900/50 z-40 transition-all duration-300 ${
					isExpanded ? "h-[38rem]" : "h-auto"
				}`}
			>
				<div className="container mx-auto px-4 py-3">
					{isExpanded && (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pt-4">
							<div className="flex flex-col items-center justify-center">
								<div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-xl">
									<img
										src={track.CoverUrl || "/placeholder.jpg"}
										alt={track.title}
										className="w-full h-full object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>

									{isPlaying && (
										<div className="absolute bottom-4 right-4 bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center animate-pulse">
											<div className="w-3 h-3 bg-white rounded-full"></div>
										</div>
									)}
								</div>

								<div className="mt-6 flex items-center gap-4">
									<Button
										variant="outline"
										size="icon"
										className={`rounded-full h-9 w-9 border-blue-500/50 hover:border-blue-400 ${
											shuffle ? "bg-blue-500/20 text-blue-400" : "text-gray-400"
										}`}
										onClick={toggleShuffle}
									>
										<Shuffle className="h-4 w-4" />
									</Button>
									<Button
										variant="outline"
										size="icon"
										className="rounded-full h-9 w-9 border-blue-500/50 hover:border-blue-400 text-gray-400"
										onClick={onPrevious}
										disabled={!onPrevious}
									>
										<SkipBack className="h-4 w-4" />
									</Button>
									<Button
										onClick={handlePlayPause}
										variant="outline"
										size="icon"
										className="h-14 w-14 rounded-full bg-blue-500 hover:bg-blue-600 border-none text-white"
									>
										{isPlaying ? (
											<Pause className="h-6 w-6" />
										) : (
											<Play className="h-6 w-6 ml-0.5" />
										)}
									</Button>
									<Button
										variant="outline"
										size="icon"
										className="rounded-full h-9 w-9 border-blue-500/50 hover:border-blue-400 text-gray-400"
										onClick={onNext}
										disabled={!onNext}
									>
										<SkipForward className="h-4 w-4" />
									</Button>
									<Button
										variant="outline"
										size="icon"
										className={`rounded-full h-9 w-9 border-blue-500/50 hover:border-blue-400 ${
											repeat ? "bg-blue-500/20 text-blue-400" : "text-gray-400"
										}`}
										onClick={toggleRepeat}
									>
										<Repeat className="h-4 w-4" />
									</Button>
								</div>
							</div>

							<div className="flex flex-col justify-center">
								<h3 className="text-2xl font-bold mb-1">{track.title}</h3>
								<Link
									href={`/artist/${track.artist
										?.replace(/\s+/g, "-")
										.toLowerCase()}`}
								>
									<p className="text-gray-400 hover:text-blue-400 transition-colors">
										{track.artist}
									</p>
								</Link>
								<p className="text-gray-500 text-sm mt-2">
									Album: {track.album}
								</p>

								<div className="mt-6">
									{showWaveform ? (
										<div
											className="relative w-full h-16 mb-4 cursor-pointer"
											onClick={handleProgressBarClick}
										>
											<canvas
												ref={waveformRef}
												width="600"
												height="80"
												className="w-full h-full"
											/>
										</div>
									) : (
										<div
											ref={progressRef}
											className="relative w-full h-4 bg-blue-900/30 rounded-full cursor-pointer mb-4"
											onClick={handleProgressBarClick}
										>
											<div
												className="absolute h-full bg-blue-500 rounded-full"
												style={{ width: `${(currentTime / duration) * 100}%` }}
											></div>
											<div
												className="absolute top-1/2 h-3 w-3 bg-white rounded-full -translate-y-1/2 -ml-1.5"
												style={{ left: `${(currentTime / duration) * 100}%` }}
											></div>
										</div>
									)}

									<div className="flex justify-between text-sm text-gray-400 mb-4">
										<span>{formatTime(currentTime)}</span>
										<span>{formatTime(duration)}</span>
									</div>

									<div className="mt-4 flex gap-3">
										<Button
											variant="outline"
											size="sm"
											className={`border-red-500 ${
												isLiked ? "text-red-500 bg-red-500/10" : "text-gray-400"
											}`}
											onClick={toggleLike}
										>
											<Heart
												className={`h-4 w-4 mr-1 ${
													isLiked ? "fill-red-500" : ""
												}`}
											/>
											{isLiked ? "Liked" : "Like"}
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="border-blue-500 text-gray-400"
										>
											<Share2 className="h-4 w-4 mr-1" />
											Share
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="border-purple-500 text-gray-400"
											onClick={toggleWaveform}
										>
											<ListMusic className="h-4 w-4 mr-1" />
											{showWaveform ? "Hide Waveform" : "Show Waveform"}
										</Button>
									</div>
								</div>
							</div>

							<div className="flex flex-col justify-between">
								<div className="flex-grow">
									<div className="bg-blue-900/20 rounded-lg p-4">
										<h4 className="font-medium mb-2">Track Information</h4>
										<div className="grid grid-cols-2 gap-2 text-sm">
											<div className="text-gray-400">Genre:</div>
											<div className="capitalize">{track.genre}</div>
											<div className="text-gray-400">Plays:</div>
											<div>{track.plays?.toLocaleString()}</div>
											<div className="text-gray-400">Duration:</div>
											<div>{track.duration}</div>
										</div>
									</div>

									{playlist && playlist.length > 0 && (
										<div className="mt-4 bg-blue-900/20 rounded-lg p-4">
											<h4 className="font-medium mb-2">Up Next</h4>
											<div className="space-y-2 max-h-28 overflow-y-auto">
												{playlist
													.slice(currentIndex + 1, currentIndex + 4)
													.map((item, idx) => (
														<div key={idx} className="flex items-center gap-2">
															<div className="w-8 h-8 flex-shrink-0">
																<img
																	src={item.CoverUrl || "/placeholder.jpg"}
																	alt={item.title}
																	className="w-full h-full object-cover rounded"
																/>
															</div>
															<div className="min-w-0 flex-1">
																<p className="text-sm truncate">{item.title}</p>
																<p className="text-xs text-gray-400 truncate">
																	{item.artist}
																</p>
															</div>
														</div>
													))}

												{currentIndex >= playlist.length - 1 && (
													<p className="text-sm text-gray-400">
														End of playlist
													</p>
												)}
											</div>
										</div>
									)}
								</div>

								<div className="mt-4 flex justify-between">
									<div className="flex items-center gap-2">
										<Button
											variant="ghost"
											size="icon"
											className="text-gray-400 hover:text-white"
											onClick={toggleMute}
										>
											{isMuted || volume === 0 ? (
												<VolumeX className="h-4 w-4" />
											) : volume < 50 ? (
												<Volume1 className="h-4 w-4" />
											) : (
												<Volume2 className="h-4 w-4" />
											)}
										</Button>
										<Slider
											value={[isMuted ? 0 : volume]}
											min={0}
											max={100}
											step={1}
											onValueChange={handleVolumeChange}
											className="w-24"
										/>
									</div>

									<div className="flex items-center gap-2">
										<Button
											variant="outline"
											size="sm"
											className="border-blue-500/50 hover:border-blue-400 text-gray-400"
											onClick={toggleMiniplayer}
										>
											<Minimize2 className="h-4 w-4 mr-1" />
											Minimize
										</Button>
										{track.downloadUrl && (
											<Button
												variant="outline"
												size="sm"
												className="border-green-500/50 hover:border-green-400 text-gray-400"
												onClick={() => window.open(track.downloadUrl, "_blank")}
											>
												<Download className="h-4 w-4 mr-1" />
												Download
											</Button>
										)}
									</div>
								</div>
							</div>
						</div>
					)}

					<div className="flex flex-col">
						{!isExpanded && (
							<div className="flex items-center justify-between mb-1">
								<span className="text-xs text-gray-400">
									{formatTime(currentTime)}
								</span>
								<div className="flex gap-2">
									<Button
										variant="ghost"
										size="icon"
										className="h-6 w-6 text-gray-400 hover:text-white"
										onClick={() => setIsExpanded(true)}
									>
										<Maximize2 className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="h-6 w-6 text-gray-400 hover:text-white"
										onClick={toggleMiniplayer}
									>
										<Minimize2 className="h-4 w-4" />
									</Button>
								</div>
								<span className="text-xs text-gray-400">
									{formatTime(duration)}
								</span>
							</div>
						)}

						{!isExpanded && (
							<div
								ref={progressRef}
								className="relative w-full h-2 bg-blue-900/30 rounded-full mb-2 cursor-pointer"
								onClick={handleProgressBarClick}
							>
								<div
									className="absolute h-full bg-blue-500 rounded-full"
									style={{ width: `${(currentTime / duration) * 100}%` }}
								></div>
							</div>
						)}

						<div className="flex items-center justify-between py-1">
							<div className="flex items-center gap-3">
								<img
									src={track.CoverUrl || "/placeholder.jpg"}
									alt={track.title}
									className="h-12 w-12 rounded object-cover"
								/>
								<div className="min-w-0">
									<h4 className="font-medium truncate">{track.title}</h4>
									<p className="text-sm text-gray-400 truncate">
										{track.artist}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-3">
								{!isExpanded && (
									<Button
										variant={isLiked ? "default" : "ghost"}
										size="icon"
										className={`h-9 w-9 rounded-full ${
											isLiked
												? "bg-red-500 text-white"
												: "text-gray-400 hover:text-red-400"
										}`}
										onClick={toggleLike}
									>
										<Heart
											className={`h-4 w-4 ${isLiked ? "fill-white" : ""}`}
										/>
									</Button>
								)}

								<Button
									variant="ghost"
									size="icon"
									className="h-9 w-9 rounded-full text-gray-400 hover:text-white"
									onClick={onPrevious}
									disabled={!onPrevious}
								>
									<SkipBack className="h-5 w-5" />
								</Button>

								<Button
									onClick={handlePlayPause}
									variant="ghost"
									size="icon"
									className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
								>
									{isPlaying ? (
										<Pause className="h-5 w-5" />
									) : (
										<Play className="h-5 w-5 ml-0.5" />
									)}
								</Button>

								<Button
									variant="ghost"
									size="icon"
									className="h-9 w-9 rounded-full text-gray-400 hover:text-white"
									onClick={onNext}
									disabled={!onNext}
								>
									<SkipForward className="h-5 w-5" />
								</Button>

								<div className="hidden md:flex items-center gap-2">
									<Button
										variant="ghost"
										size="icon"
										className="text-gray-400 hover:text-white"
										onClick={toggleMute}
									>
										{isMuted || volume === 0 ? (
											<VolumeX className="h-4 w-4" />
										) : volume < 50 ? (
											<Volume1 className="h-4 w-4" />
										) : (
											<Volume2 className="h-4 w-4" />
										)}
									</Button>
									<Slider
										value={[isMuted ? 0 : volume]}
										min={0}
										max={100}
										step={1}
										onValueChange={handleVolumeChange}
										className="w-24"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
