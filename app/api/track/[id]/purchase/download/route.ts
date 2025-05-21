import { NextResponse } from "next/server";
import { purchases } from "../../../purchases/data";

// GET /api/track/:id/purchase/download
export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const token = req.nextUrl.searchParams.get("token") || "";
	const purchase = purchases.find(
		(p) => p.downloadToken === token && p.trackId === params.id
	);
	if (!purchase) {
		return NextResponse.json(
			{ error: "Invalid or expired download token" },
			{ status: 403 }
		);
	}
	if (purchase.downloadCount >= purchase.maxDownloads) {
		return NextResponse.json(
			{ error: "Download limit reached" },
			{ status: 403 }
		);
	}
	purchase.downloadCount++;

	// TODO: Replace with real file retrieval logic
	const trackUrl = `/api/track/${params.id}/file`;
	return NextResponse.redirect(trackUrl);
}
