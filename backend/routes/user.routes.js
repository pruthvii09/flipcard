import express from "express";
import { login, signup } from "../controller/user.controller.js";
import { rateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();
const limiter = rateLimiter({
  maxRequest: 100,
  windowMs: 15 * 60 * 1000,
});
router.post("/login", limiter, login);
router.post("/signup", limiter, signup);

export default router;
