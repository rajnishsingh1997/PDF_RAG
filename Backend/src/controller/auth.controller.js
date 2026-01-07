import loginService from "../service/loginService.js";
import signinService from '../service/SigninService.js'

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await loginService(email, password);
    res.status(201).json(response);
  } catch (error) {
    console.log("Error in loginController:", error);
    next(error);
  }
};

export const signupController = async(req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const response = await signinService(email, password, name);
    res.status(201).json(response);
  } catch (error) {
    console.log("Error in signupController:", error);
    next(error);
  }
};
