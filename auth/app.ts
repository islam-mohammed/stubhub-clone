import express from "express";
import "express-async-errors";

import { json } from "body-parser";
import helmet from "helmet";
import cookieSession from "cookie-session";
import authRouter from "./src/routes/routes";
import { errorHandler, NotFoundError } from "@stubhubdev/common";

const app = express();
app.use(json());
app.use(helmet());
app.set("trust proxy", true); // trust ingress (broxy)
app.use(
  cookieSession({
    signed: false, // disable encryption
    secure: process.env.NODE_ENV === "test" ? false : true, // used only with secured connection
  })
);

app.use("/api/users", authRouter);

app.get("/*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
