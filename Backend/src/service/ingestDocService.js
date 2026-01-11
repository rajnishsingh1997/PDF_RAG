import DocumentSchema from "../models/documentSchema.js";

const ingestDocService = async (documentId) => {
  try {
    const relevantDoc = await DocumentSchema.findOne({ documentId });
    if (!relevantDoc) {
      throw new Error("Document not found");
    }

    if (relevantDoc.status !== "UPLOADED") {
      throw new Error(
        `Document status is ${relevantDoc.status}, cannot ingest`
      );
    }
    relevantDoc.status = "PROCESSING";
    relevantDoc.updatedAt = new Date();
    relevantDoc.error = null;
    await relevantDoc.save();
    return { message: "Document ingestion started successfully" };
  } catch (error) {}
};
export default ingestDocService;
