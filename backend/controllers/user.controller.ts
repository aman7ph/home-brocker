import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error";
import User from "../models/user.model";

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "you can only updat your own profile"));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 12);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          ...(req.body.password && { password: req.body.password }),
          avatar: req.body.avatar,
          phoneNumber: req.body.phoneNumber,
        },
      },
      { new: true }
    );
    if (updatedUser) {
      const { password, ...rest } = updatedUser.toObject();
      res.status(200).json(rest);
    } else {
      return next(errorHandler(401, "unsecsesful update"));
    }
  } catch (error) {
    next(error);
  }
};

const deletUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "you can only delet your own acount"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("user has been deleted");
  } catch (error) {}
};

export { updateUser, deletUser };
