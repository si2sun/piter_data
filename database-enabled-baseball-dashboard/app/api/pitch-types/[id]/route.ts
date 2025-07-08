import { NextRequest, NextResponse } from 'next/server';
import { 
  getPitchTypeById, 
  updatePitchType, 
  deletePitchType,
  type PitchTypeUpdateInput
} from '@/lib/db/pitch-type';

// GET /api/pitch-types/[id] - Get a pitch type by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const pitchType = await getPitchTypeById(id);
    
    if (!pitchType) {
      return NextResponse.json(
        { error: 'Pitch type not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(pitchType);
  } catch (error) {
    console.error('Error fetching pitch type:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pitch type' },
      { status: 500 }
    );
  }
}

// PUT /api/pitch-types/[id] - Update a pitch type
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await request.json() as PitchTypeUpdateInput;
    
    // Check if pitch type exists
    const existingPitchType = await getPitchTypeById(id);
    if (!existingPitchType) {
      return NextResponse.json(
        { error: 'Pitch type not found' },
        { status: 404 }
      );
    }
    
    const updatedPitchType = await updatePitchType(id, data);
    return NextResponse.json(updatedPitchType);
  } catch (error) {
    console.error('Error updating pitch type:', error);
    return NextResponse.json(
      { error: 'Failed to update pitch type' },
      { status: 500 }
    );
  }
}

// DELETE /api/pitch-types/[id] - Delete a pitch type
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if pitch type exists
    const existingPitchType = await getPitchTypeById(id);
    if (!existingPitchType) {
      return NextResponse.json(
        { error: 'Pitch type not found' },
        { status: 404 }
      );
    }
    
    await deletePitchType(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting pitch type:', error);
    return NextResponse.json(
      { error: 'Failed to delete pitch type' },
      { status: 500 }
    );
  }
}