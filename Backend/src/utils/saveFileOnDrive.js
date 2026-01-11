import { promises as fsPromises } from "fs";
import path from "path";
import os from "os";

const saveFileOnDrive = async(documentId, fileBuffer) => {
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, `${documentId}.pdf`);
  await fsPromises.writeFile(tempFilePath, fileBuffer);

  return tempFilePath;
};

export default saveFileOnDrive;
