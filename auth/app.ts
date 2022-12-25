import express from "express";
import "express-async-errors";

import { json } from "body-parser";
import helmet from "helmet";
import authRouter from "./src/routes/routes";
import errorHandler from "./src/middlewares/error-handler";
import NotFoundError from "./src/errors/not-found-error";

const app = express();
app.use(json());
app.use(helmet());
app.use("/api/users", authRouter);

app.get("/*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
