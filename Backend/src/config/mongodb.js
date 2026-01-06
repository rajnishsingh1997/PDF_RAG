import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    mongoose
      .connect(process.env.DB_ConnectionString)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("MongoDB connection error:", err));
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectToDatabase;
