// app/api/v?/travels/[id]/routes.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkDatabase } from "../../../../utils/connectDB";
 
const prisma = new PrismaClient();

  /* ############ Collection variable ############# */
  const collection = "travel"; 
  const response = "travels";
  const id_collection = "id_travel"
  
/*-------------------------- GET ---------------------------------*/

/*---------GET by ID-----------*/
export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  console.log("*---------GET ALL-----------*/ ",id)

  try {
    const data = await prisma[collection].findUnique({
      where: { id_travel: id },
      include: {
        flights: {
          include: {
            departure_station: true,
            arrival_station: true,
          },
        },
        company: true,
      },
    });

    if (!data) {
      return new Response(JSON.stringify({ message: 'Travel not found' }), { status: 404 });
    }

    return NextResponse.json({ [response]: data ?? [] });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}




/*
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
*/