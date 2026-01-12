import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const fileChunking  = async (docs) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 0,
  });
  const splitDocs = await splitter.splitDocuments(docs);
  return splitDocs;
};

export default fileChunking;
