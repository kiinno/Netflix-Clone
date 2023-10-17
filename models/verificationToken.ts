import { Schema, SchemaTypes, model, models } from "mongoose";

const verificationTokenSchema = new Schema(
  {
    expires: Date,
    token: {
      type: String,
      unique: true,
    },
    identifier: String,
  },
  { timestamps: true }
);
verificationTokenSchema.index(
  {
    identifier: 1,
    token: 1,
  },
  { unique: true }
);
export default models.VerificationToken ||
  model("VerificationToken", verificationTokenSchema);
