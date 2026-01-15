import { QdrantVectorStore } from "@langchain/qdrant";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import ensureCollection from "../utils/initQdrant.js";
import generateSystemPrompt from "../utils/systemPrompt.js";

const chatService = async (question, userId) => {
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
            key: "metadata.userId",
            match: { value: String(userId) },
          },
        ],
      },
    });

    const results = await retriever.invoke(question);
    console.log("Retrieved results", results);
    const context = results.map((res) => res.pageContent).join("\n---\n");
    const systemPromptBasedOnContext = generateSystemPrompt(context);

    const llm = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0,
    });
    const llmResponse = await llm.invoke([
      { role: "system", content: systemPromptBasedOnContext },
      { role: "user", content: question },
    ]);

    return llmResponse?.content ?? "";
  } catch (error) {
    console.log(error);
    throw new Error("Error in chat service");
  }
};

export default chatService;
