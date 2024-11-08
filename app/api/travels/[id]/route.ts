// app/api/travels/[id]/routes.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkDatabase } from "../../../utils/connectDB";
 
const prisma = new PrismaClient();

/*-------------------------- GET ---------------------------------*/
export async function GET(req: NextRequest) {
  const dbCheck = checkDatabase();

  const id = req.nextUrl.pathname.split("/").pop();
  console.log("id :", id)

  if (dbCheck) return dbCheck;

  try {
    const travel = await prisma.travel.findUnique({
      where: { id_travel: id },
      include: {
        flights: {
          select: {
            departure_day_time: true,
            arrival_day_time: true,
            departureStation: { select: { station_name: true } },
            arrivalStation: { select: { station_name: true } },
          },
        },
        company: {
          select: { company_name: true },
        },
      },
    });

    if (!travel) {
      return new Response(JSON.stringify({ message: 'Travel not found' }), { status: 404 });
    }

    return NextResponse.json({ travel: travel ?? [] });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}