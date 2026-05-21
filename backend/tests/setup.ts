import { prisma } from '../src/config/prisma';

beforeEach(async () => {
  await prisma.incident.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
