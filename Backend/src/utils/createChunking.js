import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const createChunking = async (docs) => {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 0,
    });
    const splitDocs = await splitter.splitDocuments(docs);
    return splitDocs;
  } catch (error) {
    console.error("Error chunking files:", error);
    throw error;
  }
};

export default createChunking;
