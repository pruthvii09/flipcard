import express from "express";
import {
  addQuestion,
  deleteQuestion,
  editQuestion,
  getAllQuestions,
  getQuestionById,
  getQuestions,
} from "../controller/questions.controller.js";
import { auth } from "../middleware/auth.js";
import { rateLimiter } from "../middleware/rateLimiter.js";

const limiter = rateLimiter({
  maxRequest: 50,
  windowMs: 15 * 60 * 1000,
});
const router = express.Router();

router.post("/", limiter, auth, addQuestion);

router.get("/", limiter, getQuestions);
router.get("/all", limiter, getAllQuestions);
router.get("/:id", limiter, getQuestionById);

router.patch("/:id", limiter, auth, editQuestion);

router.delete("/:id", limiter, auth, deleteQuestion);

export default router;
