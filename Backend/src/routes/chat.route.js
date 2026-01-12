import express from "express";
import userInputValidation from "../middleware/userInputValidation.js";
import verifyToken from "../middleware/verifyToken.js";
import chatController from "../controller/chat.controller.js";

const chatRouter = express.Router();

chatRouter.post("/ask",verifyToken, userInputValidation,chatController);

export default chatRouter;
