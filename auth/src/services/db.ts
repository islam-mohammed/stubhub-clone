import mongoose from "mongoose";
import { DatabaseConnectionError } from "@stubhubdev/common";

mongoose.connection
  .once("open", () => console.log("MongoDB connection ready!"))
  .on("error", (error) => console.log(error));
mongoose.set("strictQuery", false);

async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URI || "mongodb://auth-db-srv/auth");
  } catch (error) {
    throw new DatabaseConnectionError();
  }
}

export default dbConnect;
