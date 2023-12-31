import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { compare } from "bcrypt";
import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import clientPromise from "@/utils/clientPromise";
import { NextAuthOptions } from "next-auth";

connectDB();
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password)
            throw new Error("Email and password required");

          const user = await User.findOne({
            email: credentials.email,
          });

          if (!user || !user.password) throw new Error("Email does not exist");

          const isCorrectPassword = await compare(
            credentials.password,
            user.password
          );

          if (!isCorrectPassword) throw new Error("Invalid email or password");

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);
