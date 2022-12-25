import mongoose from "mongoose";
import DatabaseConnectionError from "../errors/database-connection-error";

mongoose.connection
  .once("open", () => console.log("MongoDB connection ready!"))
  .on("error", (error) => console.log(error));
mongoose.set("strictQuery", false);

async function dbConnect() {
  try {
    await mongoose.connect("mongodb://auth-db-srv/auth");
  } catch (error) {
    throw new DatabaseConnectionError();
  }
}

export default dbConnect;
