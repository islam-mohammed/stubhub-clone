import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import BadRequestError from "../errors/bad-request-error";

const Auth = (req: Request, res: Response, next: NextFunction) => {
  // if (!req.currentUser) {
  //   throw new BadRequestError("Unauthorized action", "", 401);
  // }
  next();
};

export default Auth;
