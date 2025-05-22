"use client"
import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ExploreFilters } from "@/components/explore-filters";
import { EnhancedTrackGrid } from "@/components/enhanced-track-grid";
import { EnhancedMusicPlayer } from "@/components/enhanced-music-player";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Grid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExplorePage() {
	const [currentTrack, setCurrentTrack] = useState<any>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [filters, setFilters] = useState({
		genre: "all",
		sortBy: "trending",
	});
	const [tracks, setTracks] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [currentPlaylist, setCurrentPlaylist] = useState<any[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true)
      try {
        const response = await fetch("https://bluetune-backend.onrender.com/bluetune/tracks");
        const fetchedTracks = await response.json();
        console.log(fetchedTracks)
        if (fetchedTracks) {
          setTracks(fetchedTracks)
        }
      } catch (error) {
        console.error("Failed to fetch tracks:", error);
      } finally {
        setLoading(false)
      }
    }

    fetchTracks()
  }, []);

	const handlePlayTrack = (track: any) => {
		if (!audioRef.current) return;

		const filteredPlaylist = filteredTracks;
		setCurrentPlaylist(filteredPlaylist);

		if (currentTrack?.id === track.id) {
			if (isPlaying) {
				audioRef.current.pause();
				setIsPlaying(false);
			} else {
				audioRef.current.play();
				setIsPlaying(true);
			}
		} else {
			const trackIndex = filteredPlaylist.findIndex((t) => t.id === track.id);
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
	};

	const handleDownload = (track: any) => {
		console.log("Download:", track.title);
		window.open(
			`https://aggregator.walrus-testnet.walrus.space/v1/blobs/${track.blobId}`,
			"_blank"
		);
	};

	const filteredTracks = tracks
		.filter((track) => {
			if (filters.genre === "all") return true;
			return track.genre === filters.genre;
		})
		.sort((a, b) => {
			if (filters.sortBy === "trending") return b.plays - a.plays;
			if (filters.sortBy === "newest") return 0;
			return 0;
		});

	return (
		<main className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
			<Header />
			<div className="container mx-auto px-4 pt-32 pb-32">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4">
						<span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
							Explore
						</span>{" "}
						Music
					</h1>
					<p className="text-gray-300 max-w-2xl mx-auto">
						Discover decentralized music from artists around the world, all
						stored on the Walrus Protocol.
					</p>
				</motion.div>

				{loading ? (
					<div className="space-y-6">
						<div className="flex justify-between items-center">
							<Skeleton className="h-10 w-40" />
							<Skeleton className="h-10 w-28" />
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{Array.from({ length: 8 }).map((_, idx) => (
								<Skeleton key={idx} className="h-72 w-full" />
							))}
						</div>
					</div>
				) : (
					<Tabs defaultValue="all" className="mb-8">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
							<TabsList className="grid grid-cols-4 max-w-md">
								<TabsTrigger value="all">All</TabsTrigger>
								<TabsTrigger value="trending">Trending</TabsTrigger>
								<TabsTrigger value="new">New</TabsTrigger>
								<TabsTrigger value="featured">Featured</TabsTrigger>
							</TabsList>

							<div className="flex justify-end items-center mt-4 sm:mt-0">
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
						</div>

						<TabsContent value="all" className="mt-6">
							<ExploreFilters filters={filters} setFilters={setFilters} />
							<EnhancedTrackGrid
								tracks={filteredTracks}
								onPlay={handlePlayTrack}
								currentTrack={currentTrack}
								isPlaying={isPlaying}
								onAddToPlaylist={handleAddToPlaylist}
								onDownload={handleDownload}
								view={viewMode}
							/>
						</TabsContent>

						<TabsContent value="trending" className="mt-6">
							<ExploreFilters
								filters={{ ...filters, sortBy: "trending" }}
								setFilters={setFilters}
							/>
							<EnhancedTrackGrid
								tracks={filteredTracks}
								onPlay={handlePlayTrack}
								currentTrack={currentTrack}
								isPlaying={isPlaying}
								onAddToPlaylist={handleAddToPlaylist}
								onDownload={handleDownload}
								view={viewMode}
							/>
						</TabsContent>

						<TabsContent value="new" className="mt-6">
							<ExploreFilters
								filters={{ ...filters, sortBy: "newest" }}
								setFilters={setFilters}
							/>
							<EnhancedTrackGrid
								tracks={filteredTracks}
								onPlay={handlePlayTrack}
								currentTrack={currentTrack}
								isPlaying={isPlaying}
								onAddToPlaylist={handleAddToPlaylist}
								onDownload={handleDownload}
								view={viewMode}
							/>
						</TabsContent>

						<TabsContent value="featured" className="mt-6">
							<ExploreFilters filters={filters} setFilters={setFilters} />
							<EnhancedTrackGrid
								tracks={filteredTracks.slice(0, 4)}
								onPlay={handlePlayTrack}
								currentTrack={currentTrack}
								isPlaying={isPlaying}
								onAddToPlaylist={handleAddToPlaylist}
								onDownload={handleDownload}
								view={viewMode}
							/>
						</TabsContent>
					</Tabs>
				)}
			</div>{" "}
			<audio
				ref={audioRef}
				onEnded={() => setIsPlaying(false)}
				onPause={() => setIsPlaying(false)}
				onPlay={() => setIsPlaying(true)}
				className="hidden"
			/>
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
