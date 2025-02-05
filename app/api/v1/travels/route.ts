// app/api/travels/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkDatabase } from "../../../utils/connectDB";
import { handleError } from "../../../utils/response"
//import { protectRoute } from "@/lib/auth"; 
const prisma = new PrismaClient();
 
  /* ############ Collection variable ############# */
  const collection = "travel"; 
  const response = "travels";
  const id_collection = "id_travel"
  
/*-------------------------- GET ---------------------------------*/
export async function GET() {
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
          orderBy: {
            departure_day_time: "asc",
          },
        },
        company: true,
      },
    });
    return NextResponse.json({ [response]: data ?? [] });
  } catch (error) {
      return handleError(error, collection);
    }
}

/*-------------------------- POST ---------------------------------*/
export async function POST(req: NextRequest) {
  const dbCheck = checkDatabase();
  if (dbCheck) return dbCheck;

  try {
    const body = await req.json();
    // Vérifie que body.id_flights est défini et est un tableau
    const id_flights = Array.isArray(body.id_flight) ? body.id_flight : [];

    const newData = await prisma.travel.create({
      data: {
        travel_name: body.travel_name,
        status_travel: body.status_travel,
        company: {
          connect: { id_company: body.company_id },
        },
        flights: {
          connect: id_flights.map((id: string) => ({ id_flight: id })),
        },
      },
    });


    return NextResponse.json({ [response]: newData });
  } catch (error) {
      return handleError(error, collection);
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
      return handleError(error, collection);
    }
}


/*-------------------------- DELETE ---------------------------------*/
export async function DELETE(req: NextRequest) {
  console.log("Dans update")
  const dbCheck = checkDatabase();
  if (dbCheck) return dbCheck;

  try {
    const { [id_collection]: idValue } = await req.json();

    if (!idValue) {
      return NextResponse.json(
        { error: `ID is required to delete ${collection}` },
        { status: 400 }
      );
    }

    const deletedData = await prisma[collection].delete({
      where: { [id_collection]: idValue },
    });

    return NextResponse.json({ message: `${collection} deleted successfully`, [response]: deletedData });
  } catch (error) {
      return handleError(error, collection);
    }
}
/*-------------------------- DELETE ---------------------------------*/
/* old version
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
      return handleError(error, collection);
    } 
}*/