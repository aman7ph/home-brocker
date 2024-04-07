import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/error";
import jwt, { VerifyErrors } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const securityKey: string = process.env.JWT_SECURITY_KEY!;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, securityKey, (err: VerifyErrors | null, user: any) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    req.user = user;
    next();
  });
};
