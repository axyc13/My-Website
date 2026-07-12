import { NextResponse } from "next/server";
import { getRecentTracks } from "@/src/app/lib/Tracks";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const tracks = await getRecentTracks({ realtime: true });
    const track = tracks[0] ?? null;

    return NextResponse.json(track, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch {
    return NextResponse.json(null, {
      status: 500,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  }
}
