import serverAuth from "@/lib/serverAuth";
import Movie from "@/models/movie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res);
    const { movieId } = req.query;

    if (!movieId || typeof movieId !== "string") throw new Error("Invalid ID");

    const movie = await Movie.findById(movieId);

    if (!movie) throw new Error("Invalid ID");

    res.status(200).json(movie);
  } catch (error) {
    res.status(400).end();
  }
}
