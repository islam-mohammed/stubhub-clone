import http from "http";
import app from "./app";
import dbConnect from "./src/services/db";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined!");
}
const server = http.createServer(app);
async function startServer() {
  await dbConnect();
  server.listen(3000, () =>
    console.log(`Lestening to port number 3000. PID: ${process.pid}`)
  );
}

startServer();
