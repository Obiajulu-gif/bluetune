import { NextResponse } from "next/server";

// GET /api/dashboard/creator/earnings
export async function GET(req: Request) {
	// TODO: Replace with real data fetching logic
	const totalEarnings = 0; // e.g., query from your database or payment service

	return NextResponse.json({ totalEarnings });
}
