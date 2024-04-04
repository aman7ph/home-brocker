import express from "express";
import {
  createListing,
  getAllListing,
} from "../controllers/listing.controller";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const router = express.Router();

router.get("/all", verifyAdmin, getAllListing);
router.post("/create", verifyAdmin, createListing);

export default router;
