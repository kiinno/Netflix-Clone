import { NextApiRequest, NextApiResponse } from "next";
import Movie from "@/models/movie";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";
import connectDB from "@/utils/connectDB";

connectDB();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST" || req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res);
      const { movieId } = req.body;
      const existingMovie = await Movie.findById(movieId);
      if (!existingMovie) throw new Error("Invalid ID");

      if (req.method === "POST") {
        currentUser.favoritesIds.push(existingMovie._id.toString());
      } else if (req.method === "DELETE") {
        currentUser.favoritesIds = currentUser.favoritesIds.filter(
          (id: any) => !id.equals(existingMovie._id.toString())
        );
      }
      const updatedUser = await currentUser.save({ new: true });
      return res.status(200).json(updatedUser);
    }
    res.status(405).end();
  } catch (error) {
    res.status(400).end();
  }
}
