import express from "express";
const authRouter = express.Router();
authRouter.post("/login", (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});
export default authRouter;
