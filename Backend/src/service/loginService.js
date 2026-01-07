import bcrypt from "bcryptjs";
import User from "../models/userSchema.js";

const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { error: "Invalid credentials" };
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { error: "Invalid credentials" };
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { message: "Login successful", token };
  } catch (error) {
    console.log("Error in loginService:", error);
    throw error;
  }
};

export default loginService;
