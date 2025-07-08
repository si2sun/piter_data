import { NextRequest, NextResponse } from 'next/server';
import { 
  createPitchData,
  type PitchDataCreateInput
} from '@/lib/db/pitch-data';
import { getPlayerById } from '@/lib/db/player';

// POST /api/pitch-data - Create new pitch data
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as PitchDataCreateInput;
    
    if (!data.playerId) {
      return NextResponse.json(
        { error: 'Player ID is required' },
        { status: 400 }
      );
    }
    
    // Verify player exists
    const player = await getPlayerById(data.playerId);
    if (!player) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }
    
    const pitchData = await createPitchData(data);
    return NextResponse.json(pitchData, { status: 201 });
  } catch (error) {
    console.error('Error creating pitch data:', error);
    return NextResponse.json(
      { error: 'Failed to create pitch data' },
      { status: 500 }
    );
  }
}