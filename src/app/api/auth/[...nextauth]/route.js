import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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
        if (!user) return null;

        const checkPass = bcrypt.compareSync(password, user?.password);
        if (!checkPass) return null;

        return { uid: user?.uid, email };
      },
    }),
  ],
  callbacks: {
    async signIn(user) {
      console.log("In signIn...");
      return true;
    },

    async jwt({ token, user }) {
      console.log("In JWT...");
      if (user) {
        token.uid = user.uid;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      console.log("In session...");
      const { uid, email } = token;
      session.uid = uid;
      session.email = email;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
