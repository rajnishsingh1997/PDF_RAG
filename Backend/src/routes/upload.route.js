import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import uploadController from "../controller/uploadController.js";

const uploadRouter = express.Router();

uploadRouter.post("/docs", verifyToken, uploadController);

export default uploadRouter;