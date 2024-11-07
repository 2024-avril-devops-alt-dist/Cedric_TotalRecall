import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
 
const prisma = new PrismaClient();
 
export async function GET(req: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "DATABASE_URL is not set" },
      { status: 500 }
    );
  }
  
  try {
    const travels = await prisma.travel.findMany();
    return NextResponse.json(travels ?? []);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch travels" },
      { status: 500 }
    );
  }
}