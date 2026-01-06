import express from "express";
const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
    const { email, password } = req.body;
});


export default authRouter;
