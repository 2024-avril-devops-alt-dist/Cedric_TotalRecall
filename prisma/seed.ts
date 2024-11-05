import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialPosts = [
  { name: 'Post 1' },
  { name: 'Post 2' },
  { name: 'Post 3' },
];

const seed = async () => {
    
  await prisma.user.createMany();

    await prisma.user.create({
      data: {
        email: 'aaa@aaa0fr',
        name : 'aaa'
      }
    });
  }

seed();