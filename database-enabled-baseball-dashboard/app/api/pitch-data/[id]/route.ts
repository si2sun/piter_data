import { NextRequest, NextResponse } from 'next/server';
import { 
  getPitchDataById, 
  updatePitchData, 
  deletePitchData,
  type PitchDataUpdateInput
} from '@/lib/db/pitch-data';

// GET /api/pitch-data/[id] - Get pitch data by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const pitchData = await getPitchDataById(id);
    
    if (!pitchData) {
      return NextResponse.json(
        { error: 'Pitch data not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(pitchData);
  } catch (error) {
    console.error('Error fetching pitch data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pitch data' },
      { status: 500 }
    );
  }
}

// PUT /api/pitch-data/[id] - Update pitch data
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await request.json() as PitchDataUpdateInput;
    
    // Check if pitch data exists
    const existingPitchData = await getPitchDataById(id);
    if (!existingPitchData) {
      return NextResponse.json(
        { error: 'Pitch data not found' },
        { status: 404 }
      );
    }
    
    const updatedPitchData = await updatePitchData(id, data);
    return NextResponse.json(updatedPitchData);
  } catch (error) {
    console.error('Error updating pitch data:', error);
    return NextResponse.json(
      { error: 'Failed to update pitch data' },
      { status: 500 }
    );
  }
}

// DELETE /api/pitch-data/[id] - Delete pitch data
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if pitch data exists
    const existingPitchData = await getPitchDataById(id);
    if (!existingPitchData) {
      return NextResponse.json(
        { error: 'Pitch data not found' },
        { status: 404 }
      );
    }
    
    await deletePitchData(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting pitch data:', error);
    return NextResponse.json(
      { error: 'Failed to delete pitch data' },
      { status: 500 }
    );
  }
}