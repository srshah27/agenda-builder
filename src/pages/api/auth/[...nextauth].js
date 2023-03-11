import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs"
import dbConnect from "@/lib/dbconnect";
import User from "@/models/Users";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        await dbConnect()
        const user = await User.findOne({ email: credentials.email })
        console.log(user);
        if (!user) return null
        // if (!user) return null

        let checkPassword = await compare(credentials.password, user.password)

        console.log(checkPassword);
        if (!checkPassword) return null
        // if (!checkPassword) return null
        return user

      }
    })
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

      return session
    },
    async jwt({ token, user, account, profile }) {
      if (user) token.id = user.id
      if (account) {
        token.accessToken = account.access_token
        if(account.provider === 'google')
          token.id = profile.id
      }
      return token
    }
  },
  pages: {
    // signIn: '/auth/signin',
  }
})