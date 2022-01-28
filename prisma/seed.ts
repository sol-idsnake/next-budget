import { Prisma } from '@prisma/client';
import prisma from './index';

const userData: Prisma.UserCreateInput = {
  firstName: 'Hendrik',
  lastName: 'Wendt',
  email: 'hendrikw@phoscreative.com',
  role: 'ADMIN',
};

async function main() {
  console.log('\n\nSeeding db...');

  const user = await prisma.user.create({
    data: userData,
  });

  console.log(`Created user with id: ${user.id}`);
  console.log(`Seeding finished.\n\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
