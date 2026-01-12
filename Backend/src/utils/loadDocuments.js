import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const loadDocuments = async (filePath) => {
  try {
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();
    return docs;
  } catch (error) {
    console.error("Error loading documents:", error);
    throw error;
  }
};

export default loadDocuments;
