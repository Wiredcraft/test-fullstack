import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const roundsOfHashing = 10;

const prisma = new PrismaClient();

async function main() {
  const passwordSaka = await bcrypt.hash('SakaIsGreat', roundsOfHashing);
  const passwordBell = await bcrypt.hash('BellWhoAreYou', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'saka@wow.com' },
    update: {
      password: passwordSaka,
    },
    create: {
      email: 'saka@wow.com',
      name: 'Saka 7',
      password: passwordSaka,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bell@wow.com' },
    update: {
      password: passwordBell,
    },
    create: {
      email: 'bell@wow.com',
      name: 'Bell 22',
      password: passwordBell,
    },
  });

  const likes1 = await prisma.like.upsert({
    where: { id: 1 },
    update: {},
    create: {
      voteId: 1,
      userId: 1,
    },
  });

  const likes2 = await prisma.like.upsert({
    where: { id: 1 },
    update: {},
    create: {
      voteId: 1,
      userId: 2,
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

  console.log({
    user1,
    user2,
    likes1,
    likes2,
    vote1,
    vote2,
    vote3,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
