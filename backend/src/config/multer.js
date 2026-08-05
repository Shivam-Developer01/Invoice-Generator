import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const companyId = req.params.id;

    const uploadDir = path.join("uploads", "company", companyId);

    fs.mkdirSync(uploadDir, {
      recursive: true,
    });

    cb(null, uploadDir);
  },

  filename(req, file, cb) {
    const extension = path.extname(file.originalname);

    cb(null, `logo-${Date.now()}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PNG, JPG, JPEG and WEBP images are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024,
  },
});

export default upload;
