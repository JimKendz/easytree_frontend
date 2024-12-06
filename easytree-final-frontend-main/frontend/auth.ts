import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth"
//import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
const HOST = process.env.API_SERVER_URL;

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              //name: { label: "Username", type: "text", placeholder: "MaxM" },
              email: { label: "Email", type: "email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

              const { email, password } = credentials ?? {}
              if (!email || !password) {
                throw new Error("Missing username or password");
              }

              const res = await fetch(`${HOST}/api/login`, {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
              })
              const user = await res.json()
        
              // If no error and we have user data, return it
              if (res.ok && user) {
                return user
              }

              if (!user) {
                throw new Error("Invalid username or password");
              }
              return null
            }
          }),
        /*GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            /* authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
              }
            } 
        }),*/
    ],
    session: {
      strategy: 'jwt'
    },
    pages: {
      signIn: "/auth?mode=login",
      // signOut: "/",
      // error: 
    },
    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token, user }) {
        const {name, ...tokenWithoutName} = token;
        session.user = tokenWithoutName as any;
        session.user.name = token.name!;
        session.user.id = token.sub!;
        
        return session;
      },
    },
} satisfies NextAuthOptions;

export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authOptions)
}