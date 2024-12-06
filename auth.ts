// auth.ts

import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import { signInSchema } from "./lib/zod"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
 
console.log('------------ Dans auth.js ------------- ');
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("AuthJS : ", credentials);
        try {
          const user = await db.user.findUnique({
            where: { email: credentials?.email as string },
          });
      
          if (user && (await bcrypt.compare(credentials.password, user.password))) {
            return { id: user.id_user, email: user.email };
          }
      
          throw new Error("Invalid credentials");
        } catch (error) {
          console.error("Error in authorize: ", error);
          return null;
        }
      },
      }),
    ],
    secret: process.env.AUTH_SECRET,
    session: {
      strategy: "jwt",
    },
  })