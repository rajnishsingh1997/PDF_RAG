import Document from "../models/documentSchema.js";

const updateDocumentStatus = async (documentId, status, errorMessage = null) => {
  const relevantDocToBeUpdated = await Document.findOne({ documentId });
  if (!relevantDocToBeUpdated) {
    throw new Error("Document not found");
  }
  relevantDocToBeUpdated.status = status;
  relevantDocToBeUpdated.updatedAt = new Date();
  relevantDocToBeUpdated.error = errorMessage;
  await relevantDocToBeUpdated.save();
  return relevantDocToBeUpdated;
};

export default updateDocumentStatus;
