import { prisma } from './index';
import { type Player } from '@prisma/client';

export type PlayerCreateInput = {
  name: string;
  number?: number;
  position?: string;
  throwingArm?: string;
  battingArm?: string;
  photoUrl?: string;
};

export type PlayerUpdateInput = Partial<PlayerCreateInput>;

// Get all players
export async function getAllPlayers() {
  return prisma.player.findMany({
    orderBy: { name: 'asc' },
  });
}

// Get player by ID
export async function getPlayerById(id: string) {
  return prisma.player.findUnique({
    where: { id },
    include: {
      pitchData: {
        include: {
          postureScores: true,
        },
        orderBy: {
          date: 'desc',
        },
      },
    },
  });
}

// Create new player
export async function createPlayer(data: PlayerCreateInput) {
  return prisma.player.create({
    data,
  });
}

// Update player
export async function updatePlayer(id: string, data: PlayerUpdateInput) {
  return prisma.player.update({
    where: { id },
    data,
  });
}

// Delete player
export async function deletePlayer(id: string) {
  return prisma.player.delete({
    where: { id },
  });
}