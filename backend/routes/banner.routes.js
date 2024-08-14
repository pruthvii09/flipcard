import express from "express";
import { addBanner, getBanner } from "../controller/banner.controller.js";

const router = express.Router();

router.post("/", addBanner);
router.get("/", getBanner);

export default router;
