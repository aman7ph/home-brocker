import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/error";
import jwt, { VerifyErrors } from "jsonwebtoken";
import User from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
const securityKey: string = process.env.JWT_SECURITY_KEY!;

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Unauthorized"));

  try {
    const user = await jwt.verify(token, securityKey);
    req.user = user;
    const checkUser = await User.findById(req.user.id);
    if (checkUser?.role !== "admin")
      return next(errorHandler(401, "Unauthorized"));
    next();
  } catch (err) {
    return next(errorHandler(403, "Forbidden"));
  }
};
