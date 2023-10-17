import connectDB from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import User from "@/models/user";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

connectDB();

async function serverAuth(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) throw new Error("Not signed in");
  const currentUser = await User.findOne({
    email: session.user.email,
  });
  if (!currentUser) throw new Error("Not signed in");
  return { currentUser };
}

export default serverAuth;
