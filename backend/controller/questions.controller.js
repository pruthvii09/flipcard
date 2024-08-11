import prisma from "../prisma/prisma.js";
import { redis } from "../redis/init.js";

export const addQuestion = async (req, res) => {
  try {
    const userId = req.user.id;
    const { question, answer, tag } = req.body;
    if (!question && !answer) {
      return res
        .status(400)
        .json({ message: "Question and answer are required" });
    }
    const newQuestion = await prisma.question.create({
      data: {
        text: question,
        answer: answer,
        tag: tag,
        userId: userId,
      },
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    console.log("error => ", error);
    res.status(500).json({ error: error });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const { tag } = req.query;
    const cachedItems = await redis.get(`all:${tag}`);
    if (cachedItems) {
      console.log("Fetched from cache => ");
      return res.status(200).json(JSON.parse(cachedItems));
    }
    console.log("tag => ", tag);

    let questions;

    if (tag === "random") {
      questions = await prisma.question.aggregateRaw({
        pipeline: [{ $sample: { size: 10 } }],
      });
    } else {
      questions = await prisma.question.findMany({
        where: { tag },
        take: 10,
      });
    }
    await redis.set(`all:${tag}`, JSON.stringify(questions));
    const expirationTime = Math.floor(Date.now() / 1000) + 120;
    await redis.expireat("all:items", expirationTime);
    res.status(200).json(questions);
  } catch (error) {
    console.log("error => ", error);
    res.status(500).json({ error: error });
  }
};
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await prisma.question.findUnique({
      where: {
        id: id,
      },
    });
    if (!question) {
      return res.status(404).json({ message: "No question found" });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const editQuestion = async (req, res) => {
  console.log("req.params => ", req.params);
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const { question, answer, tag } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Question ID is required" });
    }
    if (!question && !answer && !tag) {
      return res.status(400).json({
        message:
          "At least one field (question, answer, or tag) is required to update",
      });
    }

    const updatedQuestion = await prisma.question.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        text: question,
        answer: answer,
        tag: tag,
      },
    });

    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.log("error => ", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await prisma.question.delete({
      where: {
        id: id,
      },
    });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
