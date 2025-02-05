import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Créer les utilisateurs
 /* const user1 = await prisma.user.create({
    data: {
      id_user: '677e1d51c9a7d52bcd8b2457',
      password: '123456',
      phone: '0123456789',
      role: 'USER',
      name: 'Ced',
      email: 'ced@doe.com',
      createdAt: new Date('2025-01-08T06:38:09.269Z'),
      updatedAt: new Date('2025-01-08T06:39:53.871Z'),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id_user: '677e1daec9a7d52bcd8b245e',
      password: '123456',
      phone: '9876543210',
      role: 'COMPANY',
      name: 'Air Terre',
      email: 'contact@airterre.com',
      createdAt: new Date('2025-01-08T06:39:42.362Z'),
      updatedAt: new Date('2025-01-08T06:39:58.640Z'),
    },
  });

  const user3 = await prisma.user.create({
    data: {
      id_user: '677e1de7c9a7d52bcd8b246a',
      password: '123456',
      role: 'ADMIN',
      name: 'Admin',
      email: 'admin@admin.fr',
      createdAt: new Date('2025-01-08T06:40:39.796Z'),
      updatedAt: new Date('2025-01-08T06:40:06.303Z'),
    },
  });
*/
  // Créer les stations
  const stationTerre = await prisma.station.create({
    data: {
      id_station: '677b97377a8f644987c505c2',
      station_name: 'Terre',
    },
  });

  const stationLune = await prisma.station.create({
    data: {
      id_station: '677ba263209d504ff07eba0f',
      station_name: 'Lune',
    },
  });

  const stationTitan = await prisma.station.create({
    data: {
      id_station: '677e1b74c9a7d52bcd8b2402',
      station_name: 'Titan',
    },
  });

  const stationMars = await prisma.station.create({
    data: {
      id_station: '677e1b74c9a7d52bcd8b23ff',
      station_name: 'Mars',
    },
  });

  const stationSaturne = await prisma.station.create({
    data: {
      id_station: '677ba263209d504ff07eba14',
      station_name: 'Saturne',
    },
  });

  const stationNeptune = await prisma.station.create({
    data: {
      id_station: '677e1b74c9a7d52bcd8b2400',
      station_name: 'Neptune',
    },
  });

  // Créer les compagnies
  const companyAirTerre = await prisma.company.create({
    data: {
      id_company: '677ba263209d504ff07eba0d',
      company_name: 'Air Terre',
    },
  });

  const companyAirTitan = await prisma.company.create({
    data: {
      id_company: '677e1bcdc9a7d52bcd8b2414',
      company_name: 'Air Titan',
    },
  });

  // Créer les voyages et les vols
 /* const travel1 = await prisma.travel.create({
    data: {
      id_travel: '677e1be3c9a7d52bcd8b241a',
      status_travel: 'Active',
      travel_name: 'Voyage Terre Lune',
      company: {
        connect: { id_company: companyAirTerre.id_company },
      },
      flights: {
        create: [
          {
            id_flight: '677e1c74c9a7d52bcd8b2430',
            departure_day_time: new Date('2024-10-01T00:00:00.000Z'),
            arrival_day_time: new Date('2024-10-02T00:00:00.000Z'),
            departure_station: {
              connect: { id_station: stationTerre.id_station },
            },
            arrival_station: {
              connect: { id_station: stationLune.id_station },
            },
            seats: 100,
          },
          {
            id_flight: '677e1c74c9a7d52bcd8b2431',
            departure_day_time: new Date('2024-10-02T12:00:00.000Z'),
            arrival_day_time: new Date('2024-10-05T00:00:00.000Z'),
            departure_station: {
              connect: { id_station: stationLune.id_station },
            },
            arrival_station: {
              connect: { id_station: stationTitan.id_station },
            },
            seats: 100,
          },
        ],
      },
    },
  });

  const travel2 = await prisma.travel.create({
    data: {
      id_travel: '677e1bfec9a7d52bcd8b2422',
      status_travel: 'Active',
      travel_name: 'Voyage Terre Mars',
      company: {
        connect: { id_company: companyAirTitan.id_company },
      },
      flights: {
        create: [
          {
            id_flight: '677e1d0cc9a7d52bcd8b2445',
            departure_day_time: new Date('2024-10-11T00:00:00.000Z'),
            arrival_day_time: new Date('2024-10-12T00:00:00.000Z'),
            departure_station: {
              connect: { id_station: stationTerre.id_station },
            },
            arrival_station: {
              connect: { id_station: stationMars.id_station },
            },
            seats: 500,
          },
          {
            id_flight: '677e1d0cc9a7d52bcd8b2446',
            departure_day_time: new Date('2024-10-13T00:00:00.000Z'),
            arrival_day_time: new Date('1970-01-15T00:00:00.000Z'),
            departure_station: {
              connect: { id_station: stationMars.id_station },
            },
            arrival_station: {
              connect: { id_station: stationSaturne.id_station },
            },
            seats: 100,
          },
          {
            id_flight: '677e1d0cc9a7d52bcd8b2447',
            departure_day_time: new Date('2024-10-16T00:00:00.000Z'),
            arrival_day_time: new Date('2024-10-20T00:00:00.000Z'),
            departure_station: {
              connect: { id_station: stationSaturne.id_station },
            },
            arrival_station: {
              connect: { id_station: stationNeptune.id_station },
            },
            seats: 50,
          },
        ],
      },
    },
  });*/

  // Créer les réservations
/*  const reservation1 = await prisma.reservation.create({
    data: {
      id_reservation: '677e1e50c9a7d52bcd8b2481',
      id_travel: travel2.id_travel,
      id_company: companyAirTerre.id_company,
      id_user: user1.id_user,
      id_passenger: '',
      status_reservation: null,
    },
  }); */

  // Créer les passagers
  const passenger1 = await prisma.passenger.create({
    data: {
      id_passenger: '677e1e0ec9a7d52bcd8b2470',
      first_name: 'Prenom',
      last_name: 'Nom',
      mail: null,
      DOB: new Date('1980-10-01T00:00:00.000Z'),
      user: {
        connect: { id_user: '677e1d51c9a7d52bcd8b2457' },
      },
    },
  });

  const passenger2 = await prisma.passenger.create({
    data: {
      id_passenger: '677e1e2dc9a7d52bcd8b2479',
      first_name: 'test',
      last_name: 'test',
      mail: null,
      DOB: new Date('2009-01-01T00:00:00.000Z'),
      user: {
        connect: { id_user: '677e1d51c9a7d52bcd8b2457' },
      },
    },
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
