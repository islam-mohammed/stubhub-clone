import express from "express";
import { json } from "body-parser";
import helmet from "helmet";
import authRouter from "./src/routes/routes";

const app = express();
app.use(json());
app.use(helmet());
app.use("/api/users", authRouter);

app.get("/*", (req, res) => {
  return res.status(404).json({ message: "resource not found" });
});

export default app;
