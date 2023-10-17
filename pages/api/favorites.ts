import { NextApiRequest, NextApiResponse } from "next";
import Movie from "@/models/movie";
import serverAuth from "@/lib/serverAuth";
import connectDB from "@/utils/connectDB";

connectDB();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const { currentUser } = await serverAuth(req, res);
    const favorites = await Movie.find({
      _id: { $in: currentUser.favoritesIds },
    });

    res.status(200).json(favorites);
  } catch (error) {
    res.status(400).end();
  }
}
