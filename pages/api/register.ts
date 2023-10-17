import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user";
import { genSalt, hash } from "bcrypt";
import connectDB from "@/utils/connectDB";

connectDB();
async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { email, name, password } = req.body;

    // check if user already registered or not to send error
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) return res.status(422).json({ error: "Email taken" });

    // hashing password
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const user = User.create({
      email,
      name,
      password: hashedPassword,
      emailVerified: new Date(),
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(200).json({ error });
  }
}
export default register;
