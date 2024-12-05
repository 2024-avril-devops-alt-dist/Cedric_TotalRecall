// app/api/v?/compagnies/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkDatabase } from "../../../utils/connectDB";
import { auth } from "@/auth";
import { getToken } from "next-auth/jwt";
const prisma = new PrismaClient();
 
/* ######## Collection variable ########## */
  const collection = "company"; 
  const response = "companies";
  const id_collection = "id_company"

/*-------------------------- POST ---------------------------------*/
export async function POST(req: NextRequest) {
  const dbCheck = checkDatabase();
  if (dbCheck) return dbCheck;


  try {
    console.log("Étape 1 : Début de la requête");
    console.log("Tous les headers : ", req.headers);

    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    console.log("Étape 2 : Token récupéré", token);

    if (!token) {
      console.log("Étape 3 : Aucun token trouvé, utilisateur non autorisé");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Étape 4 : Utilisateur authentifié avec succès", token);
    const resssponse = {
      message: "Access granted",
      user: token,
    };
    console.log("Étape 5 : Réponse à retourner", resssponse);


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

/*-------------------------- GET ---------------------------------*/
export async function GET(req: NextRequest) {
  const dbCheck = checkDatabase();

  if (dbCheck) return dbCheck;

  try {
    console.log("Étape 1 : Début de la requête");
    console.log("Tous les headers : ", req.headers);

    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    console.log("Étape 2 : Token récupéré", token);

    if (!token) {
      console.log("Étape 3 : Aucun token trouvé, utilisateur non autorisé");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Étape 4 : Utilisateur authentifié avec succès", token);
    const resssponse = {
      message: "Access granted",
      user: token,
    };
    console.log("Étape 5 : Réponse à retourner", resssponse);


    const data = await prisma[collection].findMany();
    return NextResponse.json({ [response]: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch ${collection}` },
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