import http from "http";
import app from "./app";
import dbConnect from "./services/db.service";

if (!process.env.DB_URI) {
  throw new Error("DB_URI is not defined!");
}
if (!process.env.JWT_SECRET) {
  throw new Error("DB_URI is not defined!");
}

const server = http.createServer(app);

const startServer = async () => {
  await dbConnect();
  server.listen(4000, () =>
    console.log(`Lestening to port number 4000. PID: ${process.pid}`)
  );
};

startServer();
