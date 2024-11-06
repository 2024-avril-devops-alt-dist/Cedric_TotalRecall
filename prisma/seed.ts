import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: "Ced3", email: "ced3@ced.fr" },
      { name: "Ced4", email: "ced4@ced.fr" },
    ],
  });

  await prisma.comment.createMany({
    data: [
      { name: "Ced3", title: "Ced3" },
      { name: "Ced4", title: "Ced4" },
    ],
  });
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
