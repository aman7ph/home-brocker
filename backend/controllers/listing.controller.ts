import { Request, Response, NextFunction } from "express";
import Listing from "../models/listing.model";
import { errorHandler } from "../utils/error";
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
    if (!allListing) {
      return next(errorHandler(404, "no listing yet"));
    }
    return res.status(201).json(allListing);
  } catch (error) {
    next(error);
  }
};
const getAListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const aListing = await Listing.findById(req.params.id);
    if (!aListing) {
      return next(errorHandler(404, "listing not found"));
    }
    return res.status(201).json(aListing);
  } catch (error) {
    next(error);
  }
};
const deleteListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const houseToBEDEleted = await Listing.findById(req.params.id);
    if (!houseToBEDEleted) {
      return next(
        errorHandler(404, "listing dosen't exist in order to be deleted")
      );
    }

    await Listing.findByIdAndDelete(req.params.id);
    return res.status(201).json("delleted sucessesfuly");
  } catch (error) {
    next(error);
  }
};
const editeListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const theHoueToBeUpdated = await Listing.findById(req.params.id);
    if (!theHoueToBeUpdated) {
      return next(
        errorHandler(404, "listing dosen't exist in order to be Edited")
      );
    }
    const editedHouse = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(202).json(editedHouse);
  } catch (error) {
    next(error);
  }
};
export {
  createListing,
  getAllListing,
  getAListing,
  deleteListing,
  editeListing,
};
