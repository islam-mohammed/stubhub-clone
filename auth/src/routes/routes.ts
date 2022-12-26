import express, { Request, Response } from "express";
import { body } from "express-validator";
import { signIn, sigunUp } from "../services/auth.service";
import RequestValidator from "../middlewares/request-validator";
import CurrentUser from "../middlewares/current-user";
import Auth from "../middlewares/auth";
const authRouter = express.Router();

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
  [
    body("email").not().isEmpty().withMessage("Please enter your email"),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter your password"),
  ],
  RequestValidator,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const jwtUser = await signIn(email, password);
    req.session = {
      jwt: jwtUser.jwt,
    };
    return res.status(200).json(jwtUser.user);
  }
);

authRouter.get("/current", CurrentUser, Auth, (req: Request, res: Response) => {
  return res.json({
    currentUser: req.currentUser,
  });
});

authRouter.post("/signout", (req, res) => {
  req.session = null;
  res.json({
    currentUser: null,
  });
});

export default authRouter;
