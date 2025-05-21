import { NextResponse } from "next/server";
import { playlists } from "../data";

// GET /api/playlists/:id
export async function GET(
	_req: Request,
	{ params }: { params: { id: string } }
) {
	const playlist = playlists.find((p) => p.id === params.id);
	if (!playlist) {
		return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
	}
	return NextResponse.json({ playlist });
}

// PUT /api/playlists/:id
export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { name } = await req.json();
	const playlist = playlists.find((p) => p.id === params.id);
	if (!playlist) {
		return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
	}
	playlist.name = name;
	return NextResponse.json({ playlist });
}

// DELETE /api/playlists/:id
export async function DELETE(
	_req: Request,
	{ params }: { params: { id: string } }
) {
	const index = playlists.findIndex((p) => p.id === params.id);
	if (index === -1) {
		return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
	}
	playlists.splice(index, 1);
	return NextResponse.json({ success: true });
}
