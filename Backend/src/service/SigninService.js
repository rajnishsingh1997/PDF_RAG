import bcrypt from "bcryptjs";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

const signinService = async (email, password, name) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists with this email");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { message: "User registered successfully", token, user: newUser };
  } catch (error) {
    console.log("Error in signinService:", error);
    throw error;
  }
};

export default signinService;
