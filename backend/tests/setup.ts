import { prisma } from '../src/config/prisma';

beforeAll(async () => {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Incident" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "title" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "clientName" TEXT NOT NULL,
      "unitCode" TEXT,
      "type" TEXT NOT NULL,
      "priority" TEXT NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'OPEN',
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL,
      "resolvedAt" DATETIME
    );
  `);
});

beforeEach(async () => {
  await prisma.incident.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
