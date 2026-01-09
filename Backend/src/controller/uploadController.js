import uploadDocService from "../service/uploadDocService.js";

const uploadController = async (req, res, next) => {
  try {
    const uploadedFile = req.file;
    const response = await uploadDocService(uploadedFile);
    res.status(200).json(response);
  } catch (error) {
    console.log("Error in uploadController:", error);
    next(error);
  }
};

export default uploadController;
