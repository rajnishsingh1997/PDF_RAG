import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import uploadRouter from "./routes/upload.route.js";
import documentRouter from "./routes/document.route.js";
import chatRouter from "./routes/chat.route.js";
import connectToDatabase from "./config/mongodb.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:5173", // 👈 frontend URL EXACTLY
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/doc", documentRouter);
app.use("/api/chat", chatRouter);
app.use(globalErrorHandler);

connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
