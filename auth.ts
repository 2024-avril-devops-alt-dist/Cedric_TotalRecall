
// auth.ts

import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import { signInSchema } from "./lib/zod"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
 



export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials : any) => {
        try {
          const user = await db.user.findUnique({
            where: { email: credentials?.email as string },
          });
      
          if (user && (await bcrypt.compare(credentials.password, user.password))) {
            return { id: user.id_user, email: user.email, role: user.role, name: user.name };
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
      jwt({ token, user }: {token : any ; user : any}) {
        if(user) token.role = user.role as string
        return token
      },
      session({ session, token } : {session : any ; token : any}) {
        session.user.role = token.role
        return session
      }
    },
    secret: process.env.AUTH_SECRET,
    session: {
      strategy: "jwt",
    },
  })