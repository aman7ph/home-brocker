import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { userInterface } from "../types";

const signUp = async (req: Request<{}, userInterface>, res: Response) => {
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
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json(err.message);
    } else {
      res.status(500).json("An unknown error occurred");
    }
  }
};

export { signUp };
