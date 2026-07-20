import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const databaseUrl = process.env.DATABASE_URL?.trim();
const email = process.env.ADMIN_EMAIL?.trim();
const password = process.env.ADMIN_PASSWORD;
if (!databaseUrl ) {
  throw new Error('DATABASE_URL is required');
}

const adapter = new PrismaBetterSqlite3({
  url: databaseUrl,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
if ( !email || !password) {
  throw new Error('ADMIN_EMAIL, and ADMIN_PASSWORD are required');
}
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: {
      email:email,
    },

    update: {},

    create: {
      email:email,
      password: hashedPassword,
    },
  });

  console.log(`Admin created: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });