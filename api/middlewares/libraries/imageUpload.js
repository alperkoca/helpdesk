const multer = require("multer");
const path = require("path");
const CustomError = require("../../helpers/error/CustomError");


const drafImageStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        const rootDir = path.dirname(require.main.filename);
        callback(null, path.join(rootDir, "/public/uploads/draft_images"));
    },
    filename: function (req, file, callback) {
        const extension = file.mimetype.split("/")[1];
        req.ImageFileName = `${file.originalname.replace(/\.[^/.]+$/, "")}_${parseInt(Date.now())}.${extension}`;
        callback(null, req.ImageFileName);
    }
});

const ticketStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        const rootDir = path.dirname(require.main.filename);
        callback(null, path.join(rootDir, "/public/uploads/ticket_files"));
    },
    filename: function (req, file, callback) {
        const extension = file.mimetype.split("/")[1];
        req.AttachmentFileName = `${file.originalname.replace(/\.[^/.]+$/, "")}_${parseInt(Date.now())}.${extension}`;
        callback(null, req.AttachmentFileName);
    }
});

const imageFileFilter = (req, file, callback) => {
    let allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return callback(new CustomError("Please provide a valid image file", 400), false);
    }
    return callback(null, true);
}


const draftImageUploadMiddleware = multer({ storage: drafImageStorage, fileFilter: imageFileFilter });
const ticketFileUploadMiddleware = multer({ storage: ticketStorage });

module.exports = { draftImageUploadMiddleware, ticketFileUploadMiddleware };