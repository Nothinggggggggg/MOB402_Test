const multer = require("multer");
const fs = require("fs");

// #storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = __dirname + "/public/uploads";

    //  create path 'uploads' unless exists
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
// #config
const LIMIT_BYTE = 1024 * 1024;
const uploadConfig = multer({
  storage: storage,
  limits: {
    fileSize: LIMIT_BYTE,
  },
});
// #upload
const uploadOne = uploadConfig.single("avatar");

module.exports = {
  uploadOne,
};
