import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'saka@wow.com' },
    update: {},
    create: {
      email: 'saka@wow.com',
      name: 'Saka 7',
      password: 'SakaIsUnknown',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bell@wow.com' },
    update: {},
    create: {
      email: 'bell@wow.com',
      name: 'Bell 22',
      password: 'BellWhoAreYou',
    },
  });

  const vote1 = await prisma.vote.upsert({
    where: { id: 1 },
    update: {
      authorId: user1.id,
    },
    create: {
      title: 'Playstation 5',
      description: `It's the latest game console from Sony`,
      authorId: user1.id,
    },
  });

  const vote2 = await prisma.vote.upsert({
    where: { id: 2 },
    update: {
      authorId: user1.id,
    },
    create: {
      title: 'Xbox Series X',
      description: `It's the latest game console from Microsoft`,
      authorId: user1.id,
    },
  });

  const vote3 = await prisma.vote.upsert({
    where: { id: 3 },
    update: {
      authorId: user2.id,
    },
    create: {
      title: 'Nintendo Switch',
      description: `It's the latest game console from Nintendo`,
      authorId: user2.id,
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
