import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({ url: "http://localhost:6333" });

const ensureCollection = async () => {
  const collections = await client.getCollections();
  const exists = collections.collections.some(
    (c) => c.name === "embedding-collection-rag"
  );

  if (!exists) {
    await client.createCollection("embedding-collection-rag", {
      vectors: {
        size: 1536, // text-embedding-3-small
        distance: "Cosine",
      },
    });
  }
};

export default ensureCollection;
