// src/app/api/test-db/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    await prisma.$connect();
    return NextResponse.json({ message: "Connexion à la base de données réussie" });
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error);
    return NextResponse.json(
      { message: "Erreur de connexion à la base de données", error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}