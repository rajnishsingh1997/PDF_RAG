import uploadDocService from "../service/uploadDocService.js";

const uploadController = async (req, res, next) => {
  try {
    const uploadedFile = req.file;
    const userID = req.userId;
    if (!uploadedFile) {
      throw new Error("no file sent to controller");
    }
    if (!userID) {
      throw new Error("no user ID found");
    }
    const response = await uploadDocService(uploadedFile, userID);
    res.status(200).json(response);
  } catch (error) {
    console.log("Error in uploadController:", error);
    next(error);
  }
};

export default uploadController;
