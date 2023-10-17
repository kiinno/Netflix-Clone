import { Schema, SchemaTypes, model, models } from "mongoose";

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    videoUrl: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
      trim: true,
    },
    genre: String,
    duration: String,
  },
  { timestamps: true }
);

export default models.Movie || model("Movie", movieSchema);
