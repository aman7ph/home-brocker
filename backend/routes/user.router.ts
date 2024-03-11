import express from "express";
import { deletUser, updateUser } from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deletUser);

export default router;
