import { auth, requestValidator } from "@stubhubdev/common";
import express, { Request, Response } from "express";
import { body, checkSchema, validationResult, Schema } from "express-validator";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
} from "../services/tickets.service";

const baseSchemaValidation: Schema = {
  title: {
    notEmpty: {
      errorMessage: "First name is required",
    },
  },
  price: {
    notEmpty: {
      errorMessage: "Price is required",
    },
    isFloat: {
      errorMessage: "Price must be float",
    },
  },
};
const router = express.Router();

router.post(
  "/",
  auth,
  checkSchema(baseSchemaValidation),
  requestValidator,
  async (req: Request, res: Response) => {
    const ticket = await createTicket({
      ...req.body,
      userId: req.currentUser?.id,
    });
    res.status(201).json(ticket);
  }
);
router.put(
  "/:id",
  auth,
  checkSchema({
    id: {
      in: ["params"],
      errorMessage: "ID is not provided",
    },
    ...baseSchemaValidation,
  }),
  requestValidator,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const ticket = await updateTicket(req.body, req.currentUser.id, id);
    console.log(ticket);
    res.status(200).json(ticket);
  }
);

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const ticket = await getTicketById(id);
  res.status(200).json(ticket);
});

router.get("/", async (req, res) => {
  const tickets = await getAllTickets();
  res.status(200).json(await getAllTickets());
});

export default router;
