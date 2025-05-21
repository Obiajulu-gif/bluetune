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
  // Use the optimize-image API for external URLs
  const isExternal = src.startsWith("http");
  const optimizedSrc = isExternal
    ? `/api/optimize-image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
    : src;

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height || width}
      className={cn("object-cover", className)}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      {...props}
    />
  );
}
