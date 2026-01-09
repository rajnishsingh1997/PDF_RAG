import ingestDocService from "../service/ingestDocService.js";

const ingestDocument = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    if (!documentId) {
      throw new Error("Document ID is required");
    }
    const response = await ingestDocService(documentId);
    res.status(200).json(response);
  } catch (error) {
    console.log("Error in ingestDocument:", error);
    next(error);
  }
};

export default ingestDocument;  