import Image from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ComponentProps<typeof Image> {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	quality?: number;
	className?: string;
	priority?: boolean;
}

export function OptimizedImage({
	src,
	alt,
	width = 800,
	height,
	quality = 80,
	className,
	priority = false,
	...props
}: OptimizedImageProps) {
	// Handle base64 images differently
	if (src?.startsWith('data:image')) {
		return (
			<img
				src={src}
				alt={alt}
				width={width}
				height={height || width}
				className={cn("object-cover w-full h-full", className)}
				{...props}
			/>
		);
	}

	// Use Next.js's built-in image optimization for other images
	return (
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height || width}
			className={cn("object-cover", className)}
			priority={priority}
			loading={priority ? "eager" : "lazy"}
			quality={quality}
			{...props}
		/>
	);
}
