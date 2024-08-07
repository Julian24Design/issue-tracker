import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma/client"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  // callbacks: { authorized: async ({ auth }) => !!auth },
})
