import { Request, Response, NextFunction } from "express";
import Listing from "../models/listing.model";
const createListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

const getAllListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allListing = await Listing.find();
    return res.status(201).json(allListing);
  } catch (error) {
    next(error);
  }
};
export { createListing, getAllListing };
