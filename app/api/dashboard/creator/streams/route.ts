import { NextResponse } from 'next/server';

// GET /api/dashboard/creator/streams
export async function GET(req: Request) {
  // TODO: Replace with real data fetching logic
  const trackStreams = [
    { trackId: '1', title: 'Track One', streams: 100 },
    { trackId: '2', title: 'Track Two', streams: 200 },
  ];

  return NextResponse.json({ trackStreams });
}
