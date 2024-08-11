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

const router = express.Router();

router.post("/", auth, addQuestion);

router.get("/", getQuestions);
router.get("/all", getAllQuestions);
router.get("/:id", getQuestionById);

router.patch("/:id", auth, editQuestion);

router.delete("/:id", auth, deleteQuestion);

export default router;
