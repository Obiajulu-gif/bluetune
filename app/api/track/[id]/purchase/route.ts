import { NextResponse } from 'next/server';
import { purchases, Purchase } from '../../purchases/data';

// POST /api/track/:id/purchase
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const trackId = params.id;
  // In a real app, derive user address from auth
  const userAddress = 'anonymous';
  const downloadToken = crypto.randomUUID();
  const purchaseDate = new Date().toISOString();
  const maxDownloads = 3;

  const purchase: Purchase = { trackId, downloadCount: 0, maxDownloads, purchaseDate, downloadToken };
  purchases.push(purchase);

  const origin = req.headers.get('origin') || '';
  const downloadUrl = `${origin}/api/track/${trackId}/purchase/download?token=${downloadToken}`;

  return NextResponse.json({ downloadUrl });
}
