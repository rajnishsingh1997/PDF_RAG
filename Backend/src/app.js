import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import connectToDatabase from "./config/mongodb.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);

connectToDatabase().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
