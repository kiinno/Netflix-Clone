import { Schema, SchemaTypes, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 32,
      required: true,
    },
    image: String,
    email: {
      type: String,
      maxLength: 128,
      unique: true,
    },
    emailVerified: Date,
    password: {
      type: String,
      minLength: 8,
      maxLength: 128,
    },
    favoritesIds: [SchemaTypes.ObjectId],
  },
  { timestamps: true }
);

export default models.User || model("User", userSchema);
