import express from "express";
import {userDataValidator,signupUserDataValidator} from "../middleware/auth.middleware.js";
import {loginController,signupController} from '../controller/auth.controller.js'

const authRouter = express.Router();

authRouter.post("/login", userDataValidator, loginController);

authRouter.post("/signup",signupUserDataValidator,signupController);

export default authRouter;
