import bcrypt from "bcryptjs";
import User from "../models/userSchema.js";
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
    return { message: "User registered successfully" };
  } catch (error) {
    console.log("Error in signinService:", error);
    throw error;
  }
};

export default signinService;
