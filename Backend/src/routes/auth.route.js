import express from "express";
import userDataValidator from "../middleware/auth.middleware.js";
import loginController from '../controller/auth.controller.js'

const authRouter = express.Router();

authRouter.post("/login", userDataValidator, loginController);
export default authRouter;
