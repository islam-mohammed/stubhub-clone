import mongoose from "mongoose";

mongoose.connection
  .once("open", () => console.log("MongoDB connection ready!"))
  .on("error", (error) => console.log(error));
mongoose.set("strictQuery", false);

async function dbConnect() {
  await mongoose.connect("mongodb://auth-db-srv/auth");
}

export default dbConnect;
