const express = require("express");
const { ticket, draftImageUpload } = require("../controllers/ticket");
const { getAccessToRoute, userRoleMiddleware } = require('../middlewares/auth/auth');
const  {draftImageUploadMiddleware}  = require("../middlewares/libraries/imageUpload");


const router = express.Router();

router.use(getAccessToRoute);

router.get("/", ticket);
router.post("/uploaddraftimage", [draftImageUploadMiddleware.single("draft_image")], draftImageUpload )

module.exports = router;