import { OpenAIEmbeddings } from "@langchain/openai";
import Document from "../models/documentSchema.js";
import s3Client from "../utils/s3Client.js";
import saveFileOnDrive from "../utils/saveFileOnDrive.js";
import loadDocuments from "../utils/loadDocuments.js";
import cleanupTempFile from "../utils/cleanupTempFile.js";
import fileChucking from "../utils/fileChunking .js";

const s3 = s3Client();

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
    const tempFilePath = await saveFileOnDrive(documentId, downloadedFile.Body);
    const docs = await loadDocuments(tempFilePath);
    const chunkedDocs = await fileChucking(docs);
    
    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });

    await cleanupTempFile(tempFilePath);
  } catch (error) {
    console.log("Error in ingestionWorker:", error);
    throw error;
  }
};

export default injectionWorker;
