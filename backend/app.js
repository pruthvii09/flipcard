import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Routes import
import userRoutes from "./routes/user.routes.js";
import questionRoutes from "./routes/questions.routes.js";
import bannerRoutes from "./routes/banner.routes.js";

// Routes declaration
app.use("/users", userRoutes);
app.use("/questions", questionRoutes);
app.use("/banner", bannerRoutes);
export { app };
