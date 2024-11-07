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
    console.log("Tentative de récupération des stations...");
    const stations = await prisma.station.findMany();
    console.log("Stations récupérées :", stations);
    return NextResponse.json(stations ?? []);
  } catch (error) {
    console.error("Erreur lors de la récupération des stations:", error);
    return NextResponse.json({ error: "Failed to fetch station" }, { status: 500 });
  }
}