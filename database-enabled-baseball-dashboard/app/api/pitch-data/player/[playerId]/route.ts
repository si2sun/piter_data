import { NextRequest, NextResponse } from 'next/server';
import { getPlayerPitchData } from '@/lib/db/pitch-data';
import { getPlayerById } from '@/lib/db/player';

// GET /api/pitch-data/player/[playerId] - Get all pitch data for a player
export async function GET(
  request: NextRequest,
  { params }: { params: { playerId: string } }
) {
  try {
    const playerId = params.playerId;
    
    // Verify player exists
    const player = await getPlayerById(playerId);
    if (!player) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }
    
    const pitchData = await getPlayerPitchData(playerId);
    return NextResponse.json(pitchData);
  } catch (error) {
    console.error('Error fetching player pitch data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch player pitch data' },
      { status: 500 }
    );
  }
}