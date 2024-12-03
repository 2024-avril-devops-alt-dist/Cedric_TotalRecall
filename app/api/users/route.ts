// api/users/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkDatabase } from "../../utils/connectDB";
import bcrypt from 'bcryptjs';
 
const prisma = new PrismaClient();
 
/* ######## Collection variable ########## */
  const collection = "user"; 
  const response = "users";

/*-------------------------- GET ---------------------------------*/
export async function GET(req: NextRequest) {
  const dbCheck = checkDatabase();


  if (dbCheck) return dbCheck;

  try {
    const data = await prisma[collection].findMany();
    console.log('------------users : ', data)
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
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newData = await prisma[collection].create({
      data: { ...body, password: hashedPassword },
    });
    return NextResponse.json({ [response]: newData });
  } catch (error) {
    console.error('Error creating data:', error);
    return NextResponse.json(
      {
        error: `Failed to create ${collection}`,
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}