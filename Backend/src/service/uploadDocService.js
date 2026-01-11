import s3Client from "../utils/s3Client.js";
import { v4 as uuidv4 } from "uuid";
import Document from "../models/documentSchema.js";

const s3 = s3Client();
const uploadDocService = async (uploadedFile, userID) => {
  const documentId = uuidv4();
  const s3Key = `documents/${userID}/${documentId}.pdf`;

  const params = {
    Bucket: "pdf-rag-storage",
    Key: s3Key,
    Body: uploadedFile.buffer,
  };

  try {
    const result = await s3.upload(params).promise();
    const documentToSave = new Document({
      documentId: documentId,
      userId: userID,
      s3Key: s3Key,
      originalName: uploadedFile.originalname,
      status: "UPLOADED",
      error: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await documentToSave.save();
    return {
      message: "File uploaded successfully",
      fileUrl: result.Location,
      userID: userID,
      documentId: documentId,
    };
  } catch (error) {
    console.log("Error in uploadDocService:", error);
    throw error;
  }
};

export default uploadDocService;
