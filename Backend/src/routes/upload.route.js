import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import uploadController from "../controller/uploadController.js";
import uploadFileMulterMiddleware from "../middleware/upload.middleware.js";

const uploadRouter = express.Router();

uploadRouter.post("/docs", verifyToken,uploadFileMulterMiddleware, uploadController);

export default uploadRouter;