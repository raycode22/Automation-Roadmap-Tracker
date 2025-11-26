import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

let prisma: PrismaClient;
let testUser: any;
let authToken: string;

beforeAll(async () => {
  prisma = new PrismaClient();
  
  // Create test user
  const passwordHash = await bcrypt.hash('testpassword123', 12);
  testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      passwordHash,
      name: 'Test User',
    },
  });

  // Generate token for test user
  const jwt = require('jsonwebtoken');
  authToken = jwt.sign(
    { id: testUser.id, email: testUser.email },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '7d' }
  );
});

afterAll(async () => {
  // Clean up test data
  await prisma.userProgress.deleteMany();
  await prisma.artifact.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

export { prisma, testUser, authToken };