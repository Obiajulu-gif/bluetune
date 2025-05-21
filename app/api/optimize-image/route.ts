import { NextRequest, NextResponse } from "next/server";

// Simple proxy middleware for images
// This is a fallback in case direct image optimization doesn't work
export async function GET(req: NextRequest) {
	const url = new URL(req.url).searchParams.get("url");

	if (!url) {
		return new NextResponse("Missing URL parameter", { status: 400 });
	}

	try {
		const imageRes = await fetch(url);
		const arrayBuffer = await imageRes.arrayBuffer();
		
		return new NextResponse(arrayBuffer, {
			headers: {
				"Content-Type": imageRes.headers.get("Content-Type") || "image/jpeg",
				"Cache-Control": "public, max-age=31536000",
			},
		});
	} catch (error) {
		console.error("Image fetch failed:", error);
		return new NextResponse("Image fetch failed", { status: 500 });
	}
}
