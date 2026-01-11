import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const loadDocuments = async (filePath) => {
  const loader = new PDFLoader(filePath);
  const docs = await loader.load();
  return docs;
};

export default loadDocuments;
