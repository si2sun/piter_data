import { PrismaClient } from '@prisma/client';
import { pitchTypes } from '../data/pitch-types';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Create default pitch types
  for (const pitchType of pitchTypes) {
    await prisma.pitchTypeData.upsert({
      where: { name: pitchType.name },
      update: {},
      create: {
        name: pitchType.name,
        speedRange: pitchType.data.speed,
        spinRateRange: pitchType.data.spinRate,
        spinAxisRange: pitchType.data.spinAxis,
        spinEfficiency: pitchType.data.spinEfficiency,
        postureScores: pitchType.postureScores,
      },
    });
  }
  
  // Create a sample player
  const player = await prisma.player.upsert({
    where: { id: 'sample-player-1' },
    update: {},
    create: {
      id: 'sample-player-1',
      name: '張大明',
      number: 18,
      position: '投手',
      throwingArm: '右投',
      battingArm: '右打',
    },
  });
  
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });