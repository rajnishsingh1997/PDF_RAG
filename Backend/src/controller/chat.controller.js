import chatService from "../service/chatService.js";

const chatController = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.userId;
    if (!question) {
      throw new Error("Question is required");
    }
    if (!userId) {
      throw new Error("User ID is required");
    }
    const response = await chatService(question, userId);
    return res.status(200).json({ answer: response });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export default chatController;
