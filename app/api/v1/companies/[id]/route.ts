// app/api/v?/compagnies/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkDatabase } from "../../../../utils/connectDB";
import { handleError } from "../../../../utils/response"
//import { protectRoute } from "@/lib/auth"; 

const prisma = new PrismaClient();
   /* TO PROTECT ROUTE ADD
  const token = await protectRoute(req);
  if (token instanceof Response) { return token;  }
  */
 
/* ######## Collection variable ########## */
  const collection = "company"; 
  const response = "companies";
  const id_collection = "id_company"

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
