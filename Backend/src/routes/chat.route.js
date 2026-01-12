import express from "express";

const chatRouter = express.Router();

chatRouter.post("/ask", (req, res) => {
  res.send("Chat endpoint");
});

export default chatRouter;
