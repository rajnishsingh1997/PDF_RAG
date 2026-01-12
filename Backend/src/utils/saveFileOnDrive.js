import { promises as fsPromises } from "fs";
import path from "path";
import os from "os";

const saveFileOnDrive = async (documentId, fileBuffer) => {
  try {
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `${documentId}.pdf`);
    await fsPromises.writeFile(tempFilePath, fileBuffer);

    return tempFilePath;
  } catch (error) {
    console.error("Error saving file on drive:", error);
    throw error;
  }
};

export default saveFileOnDrive;
