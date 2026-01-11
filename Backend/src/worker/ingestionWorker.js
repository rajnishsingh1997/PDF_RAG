import Document from "../models/documentSchema.js";
import AWS from "aws-sdk";

AWS.config.update({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();

const injectionWorker = async (documentId) => {
  const document = await Document.findOne({ documentId });
  if (!document) {
    throw new Error("Document not found in ingestion worker");
  }
  const { userId, s3Key } = document;
  const downloadParams = {
    Key: s3Key,
    Bucket: 'pdf-rag-storage',
  };
  const downloadedFile = await s3.getObject(downloadParams).promise();
  console.log(downloadedFile.Body);
};

export default injectionWorker;
