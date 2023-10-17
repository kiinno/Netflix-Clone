import { Schema, SchemaTypes, model, models } from "mongoose";

const accountSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
    refresh_token: String,
    access_token: String,
    expires_at: Date,
    token_type: String,
    scope: String,
    id_token: String,
    session_state: String,
  },
  { timestamps: true }
);

accountSchema.index(
  {
    providerAccountId: 1,
    provider: 1,
  },
  { unique: true }
);

export default models.Account || model("Account", accountSchema);
