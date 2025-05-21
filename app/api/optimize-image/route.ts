import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

// Image optimization middleware
export async function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/api/optimize-image")) {
    return NextResponse.next();
  }

  const url = req.nextUrl.searchParams.get("url");
  const width = parseInt(req.nextUrl.searchParams.get("w") || "800", 10);
  const quality = parseInt(req.nextUrl.searchParams.get("q") || "80", 10);

  if (!url) {
    return new NextResponse("Missing URL parameter", { status: 400 });
  }

  try {
    const imageRes = await fetch(url);
    const arrayBuffer = await imageRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const optimizedImage = await sharp(buffer)
      .resize(width)
      .webp({ quality })
      .toBuffer();

    return new NextResponse(optimizedImage, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("Image optimization failed:", error);
    return new NextResponse("Image optimization failed", { status: 500 });
  }
}
