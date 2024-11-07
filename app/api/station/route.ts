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
    const stations = await prisma.station.findMany();
    return NextResponse.json(stations ?? []);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stations" },
      { status: 500 }
    );
  }
}

  export async function POST(req: NextRequest) {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "DATABASE_URL is not set" },
        { status: 500 }
      );
    }
    
    try {
      const body = await req.json();
      const newStation = await prisma.station.create({
        data: body,
      });
      return NextResponse.json(newStation);
    } catch (error) {
      console.error("Erreur lors de la création de la station:", error);
      return NextResponse.json({ error: "Failed to create station" }, { status: 500 });
    }
  }