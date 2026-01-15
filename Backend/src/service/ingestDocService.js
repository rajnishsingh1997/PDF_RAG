import DocumentSchema from "../models/documentSchema.js";
import injectionWorker from "../worker/ingestionWorker.js";

const ingestDocService = async (documentId) => {
  try {
    const relevantDoc = await DocumentSchema.findOne({ documentId });
    
    if (!relevantDoc) {
      throw new Error("Document not found");
    }

    if (relevantDoc.status === "PROCESSING" || relevantDoc.status === "READY") {
      throw new Error(
        `Document status is ${relevantDoc.status}, cannot ingest`
      );
    }
    relevantDoc.status = "PROCESSING";
    relevantDoc.updatedAt = new Date();
    relevantDoc.error = null;
    await relevantDoc.save();
    await injectionWorker(documentId);
    return { message: "Document ingestion started successfully" };
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export default ingestDocService;
