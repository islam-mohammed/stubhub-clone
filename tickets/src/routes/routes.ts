import { auth, currentUser, requestValidator } from "@stubhubdev/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { createTicket, getTicketById } from "../services/tickets.service";

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
      .isFloat()
      .withMessage("price must be float"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const ticket = await createTicket({
      ...req.body,
      userId: req.currentUser?.id,
    });
    res.status(201).json(ticket);
  }
);

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const ticket = await getTicketById(id);
  res.status(200).json(ticket);
});

export default router;
