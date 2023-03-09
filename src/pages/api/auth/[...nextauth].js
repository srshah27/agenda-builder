import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    // Credentials({
    //   name: 'Credentials',
    // },
    //   async function authorize(credentials) {
    //     const client = await clientPromise;
    //     const db = client.db();
    //     const user = db.collection('users').findOne({
    //       email: credentials.email,
    //       password: credentials.password
    //     });

    //     if (user) {
    //       return user
    //     } else {
    //       return null
    //     }
    //   }
    // )
  ],
  secret: process.env.JWT_SECRET,


  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_KEY,
    verificationOptions: {
      algorithms: ['HS256'],
    },
  },
  debug: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async session({ session, token, user }) {
      session.user.id = user.id
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  },

})