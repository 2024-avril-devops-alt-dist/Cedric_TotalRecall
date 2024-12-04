// app/api/v?/travels/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkDatabase } from "../../../utils/connectDB";
 
const prisma = new PrismaClient();
 
  /* ############ Collection variable ############# */
  const collection = "travel"; 
  const response = "travels";
  const id_collection = "id_travel"
  
/*-------------------------- GET ---------------------------------*/
export async function GET(req: NextRequest) {
  const dbCheck = checkDatabase();

  if (dbCheck) return dbCheck;

  try {
    const data = await prisma[collection].findMany({
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
    return NextResponse.json({ [response]: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch ${collection}` },
      { status: 500 }
    );
  }
}

/*-------------------------- POST ---------------------------------*/
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newTravel = await prisma.travel.create({
      data: {
        status_travel: body.status_travel,
        company_id: body.company_id,
        flights: {
          create: body.flights.map((flight: any) => ({
            departure_station: { connect: { id_station: flight.departure_station } },
            arrival_station: { connect: { id_station: flight.arrival_station } },
            departure_day_time: flight.departure_day_time,
            arrival_day_time: flight.arrival_day_time,
            seats: flight.seats,
          })),
        },
      },
    });

    return NextResponse.json({ travel: newTravel });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create Travel' },
      { status: 500 }
    );
  }
}

/*-------------------------- UPDATE ---------------------------------*/
export async function PUT(req: NextRequest) {
  const dbCheck = checkDatabase();
  if (dbCheck) return dbCheck;

  try {
    const body = await req.json();
    console.log("Dans update",body )
    const { [id_collection]: idValue, ...dataToUpdate } = body;
console.log("----------------------id_collection :", id_collection)
    if (!idValue) {
      return NextResponse.json(
        { error: `ID is required to update ${collection}` },
        { status: 400 }
      );
    }

    const updatedData = await prisma[collection].update({
      where: { [id_collection]: idValue },
      data: dataToUpdate,
    });

    return NextResponse.json({ [response]: updatedData });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update ${collection}` },
      { status: 500 }
    );
  }
}

/*-------------------------- DELETE ---------------------------------*/
export async function DELETE(req: NextRequest) {
  console.log("Dans update")
  const dbCheck = checkDatabase();
  if (dbCheck) return dbCheck;

  try {
    const { id_travel } = await req.json(); 
    console.log('------------delete id_travel : ', id_travel)

    if (!id_travel) {
      return NextResponse.json(
        { error: `ID is required to delete ${collection}` },
        { status: 400 }
      );
    }

    console.log('------------Delete associate flights  : ', id_travel)
    // Delete associate flights
    await prisma.flight.deleteMany({
      where: { travel_id: id_travel.toString() },
    });

    // Delete travel
    const deletedData = await prisma[collection].delete({
      where: { [id_collection]: id_travel },
    });

    return NextResponse.json({ message: `${collection} deleted successfully`, [response]: deletedData });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete ${collection}` },
      { status: 500 }
    );
  }
}