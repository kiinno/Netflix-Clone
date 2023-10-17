import { connect } from "mongoose";

let client: any;

async function connectDB() {
  try {
    if (!process.env.DATABASE_URL)
      throw new Error("No DATABASE_URL environment variable");

    if (client) return client;
    client = await connect(process.env.DATABASE_URL);
    return client.connection;
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
