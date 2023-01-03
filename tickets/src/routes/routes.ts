import { auth, currentUser, requestValidator } from "@stubhubdev/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  auth,
  [body("title").not().isEmpty().withMessage("First name is required")],
  [
    body("price")
      .not()
      .isEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("price must be currency"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    res.status(201).json("");
  }
);

export default router;
