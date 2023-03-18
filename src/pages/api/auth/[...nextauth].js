import NextAuth from 'next-auth/next'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import dbConnect from '@/lib/dbconnect'
import User from '@/models/Users'

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      id: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await dbConnect()
        const user = await User.findOne({ email: credentials.email })
        // if (!user) return null
        if (!user) throw new Error('No user found with this email address')

        let checkPassword = await compare(credentials.password, user.password)
        // if (!checkPassword) return null
        if (!checkPassword) throw new Error('Incorrect Credentials')
        console.log("asdasd", user);
        return { id: user._id, name: user.name, email: user.email, userId: user.userId, image: user.image }
      }
    })
  ],
  secret: process.env.JWT_SECRET,

  session: {
    strategy: 'jwt',
    jwt: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_KEY,
    verificationOptions: {
      algorithms: ['HS256']
    }
  },
  debug: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("user", user);
      if (account.provider === 'google') {
        user = {
          id: user.userId,
          name: user.username,
          email: user.email,
          image: user.image
        }
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl)
    },
    async session({ session, token }) {
      session.userId = token.userId
      session.image = token.picture
      return session
    },
    async jwt({ token, user, account, profile }) {
      if (user) { token.id = user.userId;  token.userId = user.userId}
      if (account) {
        token.accessToken = account.access_token
        if (account.provider === 'google') token.id = profile.id
      }
      return token
    }
  },
  pages: {
    signIn: '/login',
    newUser: '/newuser'
  }
})
