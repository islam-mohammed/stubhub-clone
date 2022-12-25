import mongoose from "mongoose";

mongoose.connection
  .once("open", () => console.log("MongoDB connection ready!"))
  .on("error", (error) => console.log(error));
mongoose.set("strictQuery", false);

async function dbConnect() {
  try {
    await mongoose.connect("mongodb://auth-db-srv/auth");
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
