// app/api/v?/compagnies/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkDatabase } from "../../../utils/connectDB";
import { protectRoute } from "@/lib/auth"; 

const prisma = new PrismaClient();
   /* TO PROTECT ROUTE ADD
  const token = await protectRoute(req);
  if (token instanceof Response) { return token;  }
  */
 
/* ######## Collection variable ########## */
  const collection = "company"; 
  const response = "companies";
  const id_collection = "id_company"

/*-------------------------- GET ---------------------------------*/
export async function GET(req: NextRequest) {
  const token = await protectRoute(req);
  if (token instanceof Response) { return token;  }
  try {
    const data = await prisma[collection].findMany();
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
  const dbCheck = checkDatabase();
  if (dbCheck) return dbCheck;

  try {
    const body = await req.json();
    const newData = await prisma[collection].create({
      data: body,
    });
    return NextResponse.json({ [response]: newData });
  } catch (error) {
    console.error("Étape 6 : Erreur détectée", error);
    return NextResponse.json(
      { error: `Failed to create ${collection}` },
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
    return NextResponse.json(
      { error: `Failed to delete ${collection}` },
      { status: 500 }
    );
  }
}