import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userInterface } from "../types/types";
import { errorHandler } from "../utils/error";

const securityKey: string = process.env.JWT_SECURITY_KEY!;

const signUp = async (
  req: Request<{}, userInterface>,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email, phoneNumber } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 12);
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    phoneNumber,
  });
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

const signIn = async (
  req: Request<{}, userInterface>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const ValidateUser = await User.findOne({ email });
    if (!ValidateUser) return next(errorHandler(404, "user not found"));
    const validatePassword = bcrypt.compareSync(
      password,
      ValidateUser.password
    );
    if (!validatePassword) return next(errorHandler(404, "bad cridential"));
    const token = jwt.sign({ id: ValidateUser._id }, securityKey);
    const { password: pass, ...rest } = ValidateUser.toObject();
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const signOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("user has been logged out");
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn, signOut };
