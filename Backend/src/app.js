import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import connectToDatabase from "./config/mongodb.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
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
