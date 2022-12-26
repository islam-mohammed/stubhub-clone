import { NextFunction, Response, Request } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      currentUser: JwtPayload | string | null;
    }
  }
}

const CurrentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    req.currentUser = null;
    return next();
  }
  try {
    const currentUser = verify(req.session.jwt, process.env.JWT_SECRET!);
    req.currentUser = currentUser;
  } catch (error) {
    return next();
  }

  next();
};

export default CurrentUser;
