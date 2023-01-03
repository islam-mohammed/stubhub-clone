import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";

import { json } from "body-parser";
import helmet from "helmet";
import { currentUser, errorHandler, NotFoundError } from "@stubhubdev/common";
import router from "./src/routes/routes";

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

app.use(currentUser);

app.use("/api/tickets", router);

app.get("/*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);
export default app;
