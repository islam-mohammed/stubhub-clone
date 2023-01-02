import express from "express";
import "express-async-errors";

import { json } from "body-parser";
import helmet from "helmet";
import { errorHandler, NotFoundError } from "@stubhubdev/common";

const app = express();
app.use(json());
app.use(helmet());
app.set("trust proxy", true); // trust ingress (broxy)

// app.use("/api/tickets");

app.get("/*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);
console.log("should be working");
export default app;
