const express = require("express");
const { ticket, draftImageUpload, createTicket, getTickets } = require("../controllers/ticket");
const { getAccessToRoute, userRoleMiddleware } = require('../middlewares/auth/auth');
const { draftImageUploadMiddleware, ticketFileUploadMiddleware } = require("../middlewares/libraries/imageUpload");
const {UserRoles} = require('../helpers/auth/userRoles');

const router = express.Router();

router.use(getAccessToRoute);


router.post("/uploaddraftimage", draftImageUploadMiddleware.single("draft_image"), draftImageUpload);
router.post("/", [userRoleMiddleware([UserRoles.CanAddTicket]),  ticketFileUploadMiddleware.single("attachment")], createTicket);
router.get("/", getTickets);

module.exports = router;