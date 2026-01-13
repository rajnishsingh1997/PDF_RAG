import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import Document from "../models/documentSchema.js";
import s3Client from "../utils/s3Client.js";
import saveFileOnDrive from "../utils/saveFileOnDrive.js";
import loadDocuments from "../utils/loadDocuments.js";
import cleanupTempFile from "../utils/cleanupTempFile.js";
import updateDocumentStatus from "../utils/statusUpdate.js";
import createChunking from "../utils/createChunking.js";
import ensureCollection from "../utils/initQdrant.js";

const s3 = s3Client();

const injectionWorker = async (documentId) => {
  let tempFilePath = null;

  try {
    const document = await Document.findOne({ documentId });
    if (!document) {
      throw new Error("Document not found");
    }

    const { userId, s3Key } = document;

    const downloadedFile = await s3
      .getObject({
        Bucket: "pdf-rag-storage",
        Key: s3Key,
      })
      .promise();

    if (!downloadedFile?.Body) {
      throw new Error("Failed to download file from S3");
    }

    tempFilePath = await saveFileOnDrive(documentId, downloadedFile.Body);

    const docs = await loadDocuments(tempFilePath);
    const chunkedDocs = await createChunking(docs);
   
    const enrichedChunks = chunkedDocs.map((chunk) => ({
      ...chunk,
      metadata: {
        ...chunk.metadata,
        documentId,
        userId,
      },
    }));

    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });
    await ensureCollection();
    
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: "http://localhost:6333",
        collectionName: "embedding-collection-rag",
      }
    );

    await vectorStore.addDocuments(enrichedChunks);

    await updateDocumentStatus(documentId, "READY", null);
  } catch (error) {
    console.error("Ingestion failed:", error);
    await updateDocumentStatus(documentId, "FAILED", error.message);
    throw error;
  } finally {
    if (tempFilePath) {
      await cleanupTempFile(tempFilePath);
    }
  }
};

export default injectionWorker;
