import Document from "../models/documentSchema.js";
import AWS from "aws-sdk";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import saveFileOnDrive from "../utils/saveFileOnDrive.js";
import loadDocuments from "../utils/loadDocuments.js";

AWS.config.update({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();

const injectionWorker = async (documentId) => {
  try {
    const document = await Document.findOne({ documentId });
    if (!document) {
      throw new Error("Document not found in ingestion worker");
    }
    const { userId, s3Key } = document;
    const downloadParams = {
      Key: s3Key,
      Bucket: "pdf-rag-storage",
    };
    const downloadedFile = await s3.getObject(downloadParams).promise();
    if (!downloadedFile || !downloadedFile.Body) {
      throw new Error("Failed to download file from S3");
    }
    const tempFilePath = saveFileOnDrive(documentId, downloadedFile.Body);
    const docs = await loadDocuments(tempFilePath);

  } catch (error) {
    console.log("Error in ingestionWorker:", error);
    throw error;
  }
};

export default injectionWorker;
