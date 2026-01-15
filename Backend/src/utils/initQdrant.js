import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({ url: "http://localhost:6333" });

export default async function ensureCollection() {
  const collections = await client.getCollections();
  const exists = collections.collections.some(
    (c) => c.name === "embedding-collection-rag"
  );

  if (!exists) {
    await client.createCollection("embedding-collection-rag", {
      vectors: {
        size: 1536,
        distance: "Cosine",
      },
    });

    await client.createPayloadIndex("embedding-collection-rag", {
      field_name: "metadata.userId",
      field_schema: "keyword",
    });
  }
}
