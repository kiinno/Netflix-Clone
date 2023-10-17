import serverAuth from "@/lib/serverAuth";
import Movie from "@/models/movie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function random(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res);
    const moviesList = await Movie.find();
    return res.status(200).json(moviesList);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
