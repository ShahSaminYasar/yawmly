import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log("Authorizing with credentials...");
        const { email, password } = credentials;
        if (!email || !password) return null;

        const db = await connectDB();
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email });
        if (!user) throw new Error("User not found, please register");

        const checkPass = bcrypt.compareSync(password, user?.password);
        if (!checkPass) throw new Error("Incorrect Password");

        const userObj = { uid: user?._id, email };

        return userObj;
      },
    }),
  ],
  callbacks: {
    async signIn(user) {
      if (!user.user.email) return null;
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.uid = user.uid;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      const { uid, email } = token;
      session.user.uid = uid;
      session.user.email = email;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
