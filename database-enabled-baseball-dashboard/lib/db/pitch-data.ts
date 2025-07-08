import { prisma } from './index';
import { type PostureScore } from '@prisma/client';

export type SpinAxis = {
  x: number;
  y: number;
  z: number;
};

export type PostureScoreInput = {
  name: string;
  score: number;
  distance?: number;
  height?: number;
  angle?: number;
  bestScore?: number;
  avgScore?: number;
};

export type PitchDataCreateInput = {
  playerId: string;
  pitchNumber: number;
  pitchType: string;
  speed: number;
  spinRate?: number;
  spinAxis?: SpinAxis;
  spinEfficiency?: number;
  releasePoint?: number;
  verticalMove?: number;
  horizontalMove?: number;
  date?: Date;
  postureScores?: PostureScoreInput[];
};

export type PitchDataUpdateInput = Partial<Omit<PitchDataCreateInput, 'postureScores'>>;

// Get all pitch data for a player
export async function getPlayerPitchData(playerId: string) {
  return prisma.pitchData.findMany({
    where: {
      playerId,
    },
    include: {
      postureScores: true,
    },
    orderBy: {
      date: 'desc',
    },
  });
}

// Get pitch data by ID
export async function getPitchDataById(id: string) {
  return prisma.pitchData.findUnique({
    where: { id },
    include: {
      postureScores: true,
    },
  });
}

// Create new pitch data
export async function createPitchData(data: PitchDataCreateInput) {
  const { postureScores, ...pitchData } = data;
  
  return prisma.pitchData.create({
    data: {
      ...pitchData,
      postureScores: {
        create: postureScores || [],
      },
    },
    include: {
      postureScores: true,
    },
  });
}

// Update pitch data
export async function updatePitchData(id: string, data: PitchDataUpdateInput) {
  return prisma.pitchData.update({
    where: { id },
    data,
  });
}

// Delete pitch data
export async function deletePitchData(id: string) {
  return prisma.pitchData.delete({
    where: { id },
  });
}

// Add posture score to pitch data
export async function addPostureScore(pitchDataId: string, data: PostureScoreInput) {
  return prisma.postureScore.create({
    data: {
      ...data,
      pitchDataId,
    },
  });
}

// Update posture score
export async function updatePostureScore(id: string, data: Partial<PostureScoreInput>) {
  return prisma.postureScore.update({
    where: { id },
    data,
  });
}

// Delete posture score
export async function deletePostureScore(id: string) {
  return prisma.postureScore.delete({
    where: { id },
  });
}