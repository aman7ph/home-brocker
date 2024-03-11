import express from "express";
import { createListing } from "../controllers/listing.controller";
import { verifyToken } from "../middlewares/verifyUser";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const router = express.Router();

router.post("/create", verifyAdmin, createListing);

export default router;
