// In-memory store for track purchases
export interface Purchase {
	trackId: string;
	downloadCount: number;
	maxDownloads: number;
	purchaseDate: string;
	downloadToken: string;
}

// Collection of purchases
export const purchases: Purchase[] = [];
