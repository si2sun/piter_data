import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllPitchTypes, 
  createPitchType,
  type PitchTypeCreateInput
} from '@/lib/db/pitch-type';

// GET /api/pitch-types - Get all pitch types
export async function GET() {
  try {
    const pitchTypes = await getAllPitchTypes();
    return NextResponse.json(pitchTypes);
  } catch (error) {
    console.error('Error fetching pitch types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pitch types' },
      { status: 500 }
    );
  }
}

// POST /api/pitch-types - Create a new pitch type
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as PitchTypeCreateInput;
    
    if (!data.name) {
      return NextResponse.json(
        { error: 'Pitch type name is required' },
        { status: 400 }
      );
    }
    
    const pitchType = await createPitchType(data);
    return NextResponse.json(pitchType, { status: 201 });
  } catch (error) {
    console.error('Error creating pitch type:', error);
    return NextResponse.json(
      { error: 'Failed to create pitch type' },
      { status: 500 }
    );
  }
}