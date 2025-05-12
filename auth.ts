import NextAuth from "next-auth";
import prisma from "./app/lib/prisma";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials: any): Promise<any> {
        const user = await prisma.user.findFirst({
          where: {
            username: credentials?.username,
          },
        });

        if (!user) {
          return null;
        }

        const isPassword = await bcrypt.compare(
          credentials?.password,
          user.password
        );

        if (isPassword) {
          return user;
        }
        return null;
      },
    }),
    Google,
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {
      if (user) {
        token.username = user?.username as string;
        token.img = user.img;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = (token.username || token.name) as string;
        session.user.image = (token?.img || token.picture) as string;
      }
      return session;
    },
  },
});
