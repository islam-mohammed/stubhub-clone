import http from "http";
import app from "./app";

const server = http.createServer(app);
async function startServer() {
  server.listen(3000, () =>
    console.log(`Lestening to port number 3000. PID: ${process.pid}`)
  );
}

startServer();
