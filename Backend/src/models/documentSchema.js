import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  documentId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
  s3Key: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["UPLOADED", "PROCESSING", "READY", "FAILED"],
    default: "UPLOADED",
  },
  error: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const Document =
  mongoose.models.Document || mongoose.model("Document", documentSchema);
export default Document;
