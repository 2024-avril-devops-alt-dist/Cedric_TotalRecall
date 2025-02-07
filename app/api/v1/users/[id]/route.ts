// app/api/v?/user/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkDatabase } from "../../../../utils/connectDB";
import { handleError } from "../../../../utils/response"

const prisma = new PrismaClient();
  const collection = "user"; 
  const response = "users";
  const id_collection = "id_user"

/*-------------------------- GET by ID ---------------------------------*/
export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  const dbCheck = checkDatabase();

  if (dbCheck) return dbCheck;

  try {
    const data = await prisma[collection].findUnique({
      where: { [id_collection]: id }
    });
    return NextResponse.json({ [response]: data ?? [] });
  } catch (error) {
      return handleError(error, collection);
    }
}

/*-------------------------- GET by Email ---------------------------------*/
export async function GET_BY_EMAIL(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const dbCheck = checkDatabase();

  if (dbCheck) return dbCheck;

  try {
    const data = await prisma[collection].findUnique({
      where: { email: email },
    });
    return NextResponse.json({ [response]: data ?? [] });
  } catch (error) {
    return handleError(error, collection);
  }
}