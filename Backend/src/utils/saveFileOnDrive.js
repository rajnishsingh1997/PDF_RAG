import fs from "fs";
import path from "path";
import os from "os";

const saveFileOnDrive = (documentId, fileBuffer) => {
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, `${documentId}.pdf`);
  fs.writeFileSync(tempFilePath, fileBuffer);

  return tempFilePath;
};

export default saveFileOnDrive;
