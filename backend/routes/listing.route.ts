import express from "express";
import {
  createListing,
  getAllListing,
  deleteListing,
  editeListing,
  getAListing,
} from "../controllers/listing.controller";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const router = express.Router();

router.get("/all", getAllListing);
router.get("/getalisting/:id", getAListing);
router.post("/create", verifyAdmin, createListing);
router.delete("/delete/:id", verifyAdmin, deleteListing);
router.put("/update/:id", verifyAdmin, editeListing);

export default router;
