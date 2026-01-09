import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import Document from "../models/DocumentSchema.js";

AWS.config.update({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();

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
