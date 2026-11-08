import { NextRequest, NextResponse } from 'next/server';
import { getLeaderboard, addLeaderboardEntry } from '@/lib/leaderboard';
import { parseLeaderboardEntry } from '@/lib/validation';

export async function GET() {
  try {
    const entries = await getLeaderboard();
    return NextResponse.json(entries, {
      headers: { 'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=30' },
    });
  } catch (error) {
    console.error('Leaderboard GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  const input = parseLeaderboardEntry(body);
  if (!input) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  try {
    const { rank } = await addLeaderboardEntry(input);

    return NextResponse.json({ success: true, rank });
  } catch (error) {
    console.error('Leaderboard POST error:', error);
    return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
  }
}
