import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
