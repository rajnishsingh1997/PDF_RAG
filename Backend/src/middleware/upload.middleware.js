import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
}).single("uploadedFile");

const uploadFileMulterMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!req.file) {
      return next(new Error("No file uploaded"));
    }
    next();
  });
};

export default uploadFileMulterMiddleware;
