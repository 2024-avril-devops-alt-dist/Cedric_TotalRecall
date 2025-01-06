import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Créer des compagnies
  const company1 = await prisma.company.create({
    data: {
      company_name: 'Air Terre',
      travels: {
        create: [
          {
            status_travel: 'ACTIVE',
            flights: {
              create: [
                {
                  departure_day_time: new Date('2023-10-01T08:00:00Z'),
                  arrival_day_time: new Date('2023-10-01T10:00:00Z'),
                  departure_station: {
                    create: {
                      station_name: 'Terre',
                    },
                  },
                  arrival_station: {
                    create: {
                      station_name: 'Lune',
                    },
                  },
                  seats: 100,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const company2 = await prisma.company.create({
    data: {
      company_name: 'Air Saturne',
      travels: {
        create: [
          {
            status_travel: 'INACTIVE',
            flights: {
              create: [
                {
                  departure_day_time: new Date('2023-11-01T09:00:00Z'),
                  arrival_day_time: new Date('2023-11-01T11:00:00Z'),
                  departure_station: {
                    create: {
                      station_name: 'Lune',
                    },
                  },
                  arrival_station: {
                    create: {
                      station_name: 'Saturne',
                    },
                  },
                  seats: 150,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log({ company1, company2 });
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
