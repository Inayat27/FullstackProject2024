import { connect } from "mongoose";
import { config } from "dotenv";

config();

export async function run() {
  try {
    const connectionString = process.env.MONGO_DATABASE_CONNECTION_STRING;

    if (!connectionString) {
      throw new Error(
        "MONGO_DATABASE_CONNECTION_STRING is not defined in the environment variables."
      );
    }
    // Connect to MongoDB
    await connect(connectionString);
    //       // await connect("mongodb+srv://inayat:inayat92@cluster0.texd150.mongodb.net/RealTimeChatApplication");
    console.log("Successfully connected to MongoDB!");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure code
  }
}
