import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import RequestValidationError from "../errors/request-validation-error";

const authRouter = express.Router();

authRouter.get("/current", (req, res) => {
  return res.send("Get Crurrent User!");
});
authRouter.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 10 characters"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    return res.send("Create New User!");
  }
);
authRouter.post("/signin", (req, res) => {
  const { email, password } = req.body;

  return res.send("Handle user sign in!");
});
authRouter.post("/signout", (req, res) => {
  return res.send("Handle user signout!");
});

export default authRouter;
