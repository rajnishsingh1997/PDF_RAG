import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const fileChucking = (docs) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 0,
  });
  const texts = splitter.splitText(docs);
  return texts;
};

export default fileChucking;
