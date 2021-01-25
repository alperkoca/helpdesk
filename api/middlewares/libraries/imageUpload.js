const multer = require("multer");
const path = require("path");
const CustomError = require("../../helpers/error/CustomError");


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const rootDir = path.dirname(require.main.filename);
        callback(null, path.join(rootDir, "/public/uploads/draft_images"));
    },
    filename: function (req, file, callback) {
        const extension = file.mimetype.split("/")[1];
        req.ImageFileName = `image_${parseInt(Date.now())}.${extension}`;
        callback(null, req.ImageFileName);
    }
});

const fileFilter = (req, file, callback) => {
    let allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return callback(new CustomError("Please provide a valid image file", 400), false);
    }
    return callback(null, true);
}


const draftImageUploadMiddleware = multer({ storage, fileFilter });

module.exports = { draftImageUploadMiddleware };