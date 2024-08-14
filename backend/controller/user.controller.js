import { createToken } from "../helper/jwtHelper.js";
import prisma from "../prisma/prisma.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Acoount not found" });
    }
    const match = user.password === password;
    if (!match) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    const token = createToken(user.id);
    res.status(201).json({ email: user.email, token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(400).json({ message: "Already Registred" });
    }
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });
    const token = createToken(newUser.id);
    res.status(201).json({ email: newUser.email, token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
