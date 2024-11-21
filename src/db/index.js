import mongoose from "mongoose";
import { DB_NAME } from "@/utils/constants";



let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  try {
    const mongoUrl = `${process.env.MONGODB_URI}/${DB_NAME}`;

    if (!mongoUrl) {
      throw new Error("MONGO_URL environment variable is not set.");
    }

    await mongoose.connect(mongoUrl);

    isConnected = true; 
    console.log("Connected to MongoDB");

  } catch (error) {
    console.error("Failed to connect to MongoDB");
    console.error(error);
  }
}

export default connectDB

