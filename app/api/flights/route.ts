import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkDatabase } from "../../utils/connectDB";
 
const prisma = new PrismaClient();

/* ######## Collection variable ########## */ 
  const collection = "flight"; 
  const response = "flights";
  
/*-------------------------- GET ---------------------------------*/
export async function GET(req: NextRequest) {
  const dbCheck = checkDatabase();


  if (dbCheck) return dbCheck;

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
    return NextResponse.json(
      { error: `Failed to create ${collection}` },
      { status: 500 }
    );
  }
}