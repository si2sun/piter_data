import { prisma } from './index';

export type PitchTypeScores = {
  name: string;
  score: number;
}[];

export type PitchTypeCreateInput = {
  name: string;
  speedRange: string;
  spinRateRange: string;
  spinAxisRange: string;
  spinEfficiency: string;
  postureScores: PitchTypeScores;
};

export type PitchTypeUpdateInput = Partial<PitchTypeCreateInput>;

// Get all pitch types
export async function getAllPitchTypes() {
  return prisma.pitchTypeData.findMany({
    orderBy: { name: 'asc' },
  });
}

// Get pitch type by ID
export async function getPitchTypeById(id: string) {
  return prisma.pitchTypeData.findUnique({
    where: { id },
  });
}

// Get pitch type by name
export async function getPitchTypeByName(name: string) {
  return prisma.pitchTypeData.findFirst({
    where: { name },
  });
}

// Create new pitch type
export async function createPitchType(data: PitchTypeCreateInput) {
  return prisma.pitchTypeData.create({
    data,
  });
}

// Update pitch type
export async function updatePitchType(id: string, data: PitchTypeUpdateInput) {
  return prisma.pitchTypeData.update({
    where: { id },
    data,
  });
}

// Delete pitch type
export async function deletePitchType(id: string) {
  return prisma.pitchTypeData.delete({
    where: { id },
  });
}