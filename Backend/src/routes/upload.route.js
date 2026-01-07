import express from "express";
import verifyToken from "../middleware/verifyToken.js";

const uploadRouter = express.Router();

uploadRouter.post("/docs", verifyToken, (req, res) => {
  res.send("File uploaded successfully");
});

export default uploadRouter;