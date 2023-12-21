import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const vote1 = await prisma.vote.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Playstation 5',
      description: `It's the latest game console from Sony`,
    },
  });

  const vote2 = await prisma.vote.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Xbox Series X',
      description: `It's the latest game console from Microsoft`,
    },
  });

  const vote3 = await prisma.vote.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Nintendo Switch',
      description: `It's the latest game console from Nintendo`,
    },
  });

  console.log({ vote1, vote2, vote3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
