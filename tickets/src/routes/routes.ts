import { auth, currentUser } from "@stubhubdev/common";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", auth, async (req: Request, res: Response) => {
  res.status(201).json("");
});

export default router;
