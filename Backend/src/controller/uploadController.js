import multer from "multer";
import path from "path";
const uploadController = (req,res,next) => {
  const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({
    storage: storage,
    // limits: { fileSize: 1000000 },
  }).single("uploadedFile");

  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!req.file) {
      return next(new Error("No file uploaded"));
    }
    console.log(req.file);
    res.send("File uploaded!");
  });
};

export default uploadController;
