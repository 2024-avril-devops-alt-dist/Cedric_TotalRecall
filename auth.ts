// auth.ts

import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getToken } from "next-auth/jwt";


declare module "next-auth" {
  interface User {
    role?: string;
    id_user?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id_user?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const user = await db.user.findUnique({
            where: { email: credentials?.email as string },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const { password: passwordCredentials } = credentials;
          const { password: passwordUser } = user;

          const isValidPassword = await bcrypt.compare(
            passwordCredentials as string,
            passwordUser
          );

          if (isValidPassword) {
            return {
              id: user.id_user,
              email: user.email,
              role: user.role,
              name: user.name,
            };
          }

          throw new Error("Invalid credentials");
        } catch (error) {
          console.error("Error in authorize: ", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id_user = user.id_user; 
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.user.id_user = token.id_user;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});

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
