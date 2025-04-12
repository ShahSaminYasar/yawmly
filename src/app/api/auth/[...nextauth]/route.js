import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { ObjectId } from "mongodb";

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

        // const checkPass = bcrypt.compareSync(password, user?.password); -> May become problematic under load
        const checkPass = await bcrypt.compare(password, user?.password);
        if (!checkPass) throw new Error("Incorrect Password");

        const userObj = { uid: user?._id, email };

        return userObj;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("In sign in callback...");
      if (!user.email) return false;
      if (account?.provider === "google") {
        let db = await connectDB();
        let findUserDoc = await db
          .collection("users")
          .findOne({ email: user?.email });
        if (!findUserDoc) {
          user.uid = null;
          return true;
        } else {
          user.uid = findUserDoc?.uid || findUserDoc?._id;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      console.log("In JWT callback...");
      // console.log("User in token: ", user, token);
      if (user) {
        token.email = user.email;
        if (user.uid) {
          token.uid = user.uid;
        }
      }

      return token;
    },

    async session({ session, token }) {
      console.log("In Session callback...");
      const { uid, email } = token;
      if (!uid) {
        console.log("Trying to get the uid from session callback...");
        let db = await connectDB();
        let doc = await db.collection("users").findOne({ email });
        if (doc && doc.uid) {
          session.user.uid = doc.uid;
        }
      } else {
        session.user.uid = uid;
      }
      session.user.email = email;

      return session;
    },
  },
  pages: {
    error: "/account",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
