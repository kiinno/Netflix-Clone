import { Schema, SchemaTypes, model, models } from "mongoose";

const sessionSchema = new Schema(
  {
    sessionToken: {
      type: String,
      unique: true,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    expires: Date,
  },
  { timestamps: true }
);

export default models.Session || model("Session", sessionSchema);
