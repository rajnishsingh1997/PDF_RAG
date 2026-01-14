import { QdrantVectorStore } from "@langchain/qdrant";
import { OpenAIEmbeddings } from "@langchain/openai";
import ensureCollection from "../utils/initQdrant.js";

const chatService = async (question, userId) => {
  console.log("inside chat service");
  try {
    if (!question || !userId) {
      throw new Error("Invalid parameters");
    }
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
    const retriever = vectorStore.asRetriever({
      k: 6,
      filter: {
        must: [
          {
            key: "userId",
            match: { value: userId },
          },
        ],
      },
    });

    const results = await retriever.invoke(question);
    console.log("Retrieved results:", results);
  } catch (error) {
    console.log(error);
    throw new Error("Error in chat service");
  }
};

export default chatService;
