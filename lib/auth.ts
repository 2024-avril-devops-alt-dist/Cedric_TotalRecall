// lib/auth.ts

import { getToken } from "next-auth/jwt";

export async function protectRoute(req: Request) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    return token;
  } catch (error) {
    console.error("Erreur lors de la vérification du token", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}