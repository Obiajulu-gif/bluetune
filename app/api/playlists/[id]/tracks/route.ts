import { NextResponse } from 'next/server';
import { playlists } from '../../data';

// POST /api/playlists/:id/tracks
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { trackId } = await req.json();
  const playlist = playlists.find(p => p.id === params.id);
  if (!playlist) {
    return NextResponse.json({ error: 'Playlist not found' }, { status: 404 });
  }
  if (!playlist.tracks.includes(trackId)) {
    playlist.tracks.push(trackId);
  }
  return NextResponse.json({ playlist });
}
