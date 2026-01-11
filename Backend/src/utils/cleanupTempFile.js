import fs from "fs";

const cleanupTempFile = async(filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error("Failed to clean up temp file:", filePath, err);
  }
};

export default cleanupTempFile;
