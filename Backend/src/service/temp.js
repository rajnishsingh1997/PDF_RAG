try {
    if (!question || !userId) {
      throw new Error("Invalid parameters");
    }
    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });
    await ensureCollection();

    
    

    
    console.log("Retrieved results", results);
    const context = results.map((res) => res.pageContent).join("\n---\n");
    return "hello"
  } catch (error) {
    console.log(error);
    throw new Error("Error in chat service");
  }