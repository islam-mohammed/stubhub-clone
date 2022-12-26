import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { signIn, sigunUp } from "../services/auth.service";
import RequestValidationError from "../errors/request-validation-error";
import RequestValidator from "../middlewares/request-validator";

const authRouter = express.Router();
authRouter.get("/current", (req, res) => {
  return res.send("Get Crurrent User!");
});

authRouter.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("firstName").not().isEmpty().withMessage("First name is required"),
    body("lastName").not().isEmpty().withMessage("Last name is required"),
    body("password")
      .trim()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .withMessage(
        "Password must at least contains 8 characters, 1 upper case, 1 lower case, and 1 number"
      ),
  ],
  RequestValidator,
  async (req: Request, res: Response) => {
    const jwtUser = await sigunUp(req.body);
    req.session = {
      jwt: jwtUser.jwt,
    };

    return res.status(201).json(jwtUser.user);
  }
);

authRouter.post(
  "/signin",
  [body("email").not().isEmpty().withMessage("Please enter your email")],
  [
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter your password"),
  ],
  RequestValidator,
  (req: Request, res: Response) => {
    const { email, password } = req.body;
    signIn(email, password);

    return res.send("Handle user sign in!");
  }
);
authRouter.post("/signout", (req, res) => {
  return res.send("Handle user signout!");
});

export default authRouter;
