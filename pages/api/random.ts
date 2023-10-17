import serverAuth from "@/lib/serverAuth";
import Movie from "@/models/movie";
import { randomInt } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function random(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res);
    const movieCount = await Movie.countDocuments();
    const randomIndex = randomInt(movieCount);

    const randomMovie = await Movie.find().limit(1).skip(randomIndex);
    res.status(200).json(randomMovie[0]);
  } catch (error) {
    res.status(400).end();
  }
}
