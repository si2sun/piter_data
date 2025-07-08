import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllPlayers, 
  createPlayer,
  type PlayerCreateInput
} from '@/lib/db/player';

// GET /api/players - Get all players
export async function GET() {
  try {
    const players = await getAllPlayers();
    return NextResponse.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    );
  }
}

// POST /api/players - Create a new player
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as PlayerCreateInput;
    
    if (!data.name) {
      return NextResponse.json(
        { error: 'Player name is required' },
        { status: 400 }
      );
    }
    
    const player = await createPlayer(data);
    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    console.error('Error creating player:', error);
    return NextResponse.json(
      { error: 'Failed to create player' },
      { status: 500 }
    );
  }
}