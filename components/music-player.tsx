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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { OptimizedImage } from "./ui/optimized-image";

type MusicPlayerProps = {
	track: any;
	isPlaying: boolean;
	setIsPlaying: (isPlaying: boolean) => void;
	onClose: () => void;
	onNext?: () => void;
	onPrevious?: () => void;
	playlist?: any[];
	currentIndex?: number;
};

export function MusicPlayer({
	track,
	isPlaying,
	setIsPlaying,
	onClose,
	onNext,
	onPrevious,
	playlist,
	currentIndex = 0,
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

	const audioRef = useRef<HTMLAudioElement | null>(null);
	const progressRef = useRef<HTMLDivElement>(null);
	const volumeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// In a real implementation, this would use the actual audio file
		// For this demo, we're just simulating the audio player
		if (!audioRef.current) {
			audioRef.current = new Audio();
			audioRef.current.volume = volume / 100;

			audioRef.current.addEventListener("loadedmetadata", () => {
				setDuration(audioRef.current?.duration || 0);
			});

			audioRef.current.addEventListener("timeupdate", () => {
				setCurrentTime(audioRef.current?.currentTime || 0);
			});

			audioRef.current.addEventListener("ended", () => {
				setIsPlaying(false);
				setCurrentTime(0);
			});
		}

		// Simulate loading a track
		if (track?.duration) {
			const durationParts = track.duration.split(":");
			if (durationParts.length === 2) {
				setDuration(
					Number.parseInt(durationParts[0]) * 60 +
						Number.parseInt(durationParts[1])
				);
			}
		}

		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.src = "";
			}
		};
	}, [track, setIsPlaying]);

	useEffect(() => {
		if (audioRef.current) {
			if (isPlaying) {
				// In a real implementation, this would play the actual audio file
				// For this demo, we're just simulating playback
				const playPromise = audioRef.current.play();
				if (playPromise !== undefined) {
					playPromise.catch(() => {
						// Auto-play was prevented, handle this case
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
		if (isMuted) {
			setIsMuted(false);
			if (volume === 0) setVolume(50);
		} else {
			setIsMuted(true);
		}
	};

	const toggleExpandCollapse = () => {
		setIsExpanded(!isExpanded);
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

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	// Safely get track properties with fallbacks
	const trackTitle = track?.title || 'Untitled';
	const trackArtist = track?.artist || 'Unknown Artist';
	const trackAlbum = track?.album || 'Unknown Album';
	const trackCoverUrl = track?.coverUrl || '/placeholder.svg';
	const trackGenre = track?.genre || 'Unknown';
	const trackPlays = track?.plays || 0;
	const trackDuration = track?.duration || '0:00';
	const trackBlobId = track?.blobId || '-';

	return (
		<motion.div
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			className={`fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-blue-900/50 z-40 transition-all duration-300 ${
				isExpanded ? "h-96" : "h-auto"
			}`}
		>
			<div className="container mx-auto px-4 py-3">
				{isExpanded && (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
						<div className="flex justify-center">
							<div className="w-48 h-48 rounded-lg overflow-hidden">
								<img
									src={trackCoverUrl}
									alt={trackTitle}
									className="w-full h-full object-cover"
								/>
							</div>
						</div>

						<div className="flex flex-col justify-center">
							<h3 className="text-2xl font-bold mb-1">{trackTitle}</h3>
							<Link
								href={`/artist/${trackArtist
									.replace(/\s+/g, "-")
									.toLowerCase()}`}
							>
								<p className="text-gray-400 hover:text-blue-400 transition-colors">
									{trackArtist}
								</p>
							</Link>
							<p className="text-gray-500 text-sm mt-2">Album: {trackAlbum}</p>
							<div className="mt-4 flex gap-3">
								<Button
									variant="outline"
									size="sm"
									className={`border-red-500 ${
										isLiked ? "text-red-500 bg-red-500/10" : "text-gray-400"
									}`}
									onClick={() => setIsLiked(!isLiked)}
								>
									<Heart
										className={`h-4 w-4 mr-1 ${isLiked ? "fill-red-500" : ""}`}
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
								>
									<ListMusic className="h-4 w-4 mr-1" />
									Add to Playlist
								</Button>
							</div>
						</div>

						<div className="flex flex-col justify-center">
							<div className="bg-blue-900/20 rounded-lg p-4">
								<h4 className="font-medium mb-2">Track Information</h4>
								<div className="grid grid-cols-2 gap-2 text-sm">
									<div className="text-gray-400">Genre:</div>
									<div className="capitalize">{trackGenre}</div>
									<div className="text-gray-400">Plays:</div>
									<div>{trackPlays.toLocaleString()}</div>
									<div className="text-gray-400">Duration:</div>
									<div>{trackDuration}</div>
								</div>
								<div className="mt-4">
									<h5 className="text-xs text-gray-400 mb-1">Blob ID:</h5>
									<div className="bg-black/30 rounded p-2 font-mono text-xs break-all">
										{trackBlobId}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				<div className="flex flex-col">
					<div className="flex items-center justify-between mb-1">
						<span className="text-xs text-gray-400">
							{formatTime(currentTime)}
						</span>
						<Button
							variant="ghost"
							size="icon"
							className="h-6 w-6 text-gray-400 hover:text-white"
							onClick={() => setIsExpanded(!isExpanded)}
						>
							<Maximize2 className="h-4 w-4" />
						</Button>
						<span className="text-xs text-gray-400">
							{formatTime(duration)}
						</span>
					</div>

					<Slider
						value={[currentTime]}
						min={0}
						max={duration || 100}
						step={1}
						onValueChange={handleSeek}
						className="my-2"
					/>

					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<img
								src={trackCoverUrl}
								alt={trackTitle}
								className="h-12 w-12 rounded"
							/>
							<div>
								<h4 className="font-medium">{trackTitle}</h4>
								<p className="text-sm text-gray-400">{trackArtist}</p>
							</div>
						</div>

						<div className="flex items-center gap-4">
							<Button
								variant="ghost"
								size="icon"
								className="text-gray-400 hover:text-white"
								onClick={onPrevious}
							>
								<SkipBack className="h-5 w-5" />
							</Button>
							<Button
								onClick={handlePlayPause}
								variant="ghost"
								size="icon"
								className="h-10 w-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
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
								className="text-gray-400 hover:text-white"
								onClick={onNext}
							>
								<SkipForward className="h-5 w-5" />
							</Button>
						</div>

						<div className="hidden md:flex items-center gap-2">
							<Button
								variant="ghost"
								size="icon"
								className="text-gray-400 hover:text-white"
								onClick={toggleMute}
							>
								{isMuted || volume === 0 ? (
									<VolumeX className="h-4 w-4" />
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
			
		</motion.div>
	);
}
