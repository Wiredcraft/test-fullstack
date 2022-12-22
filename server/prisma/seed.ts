import { PrismaClient } from '@prisma/client';
import md5 from 'md5';

const prisma = new PrismaClient();

const initialUsers = ['William', 'Zerg', 'Max', 'Joe'];

async function main() {
  await Promise.all(
    initialUsers.map((username) =>
      prisma.user
        .upsert({
          where: { username },
          update: {},
          create: { username, password: md5(username) },
        })
        .then((user) => {
          console.log(JSON.stringify(user));
        }),
    ),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
