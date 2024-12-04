// app/api/v?/users/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkDatabase } from "../../../utils/connectDB";
import { signInSchema } from "@/lib/zod";
import { z } from "zod";
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

    // Zod Validation 
    const parsedData = signInSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsedData.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password } = parsedData.data;

    // Vérification si l'email existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newData = await prisma[collection].create({
      data: { ...parsedData.data, password: hashedPassword },
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