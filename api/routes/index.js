const express = require("express");
const ticket = require("./ticket");
const auth = require("./auth");
const category = require("./category");
const status = require('./status');
const priority = require('./priority');
const user = require('./user');
const userRole = require('./userrole');
const path = require("path");

const router = express.Router();

router.use("/ticket", ticket);
router.use("/auth", auth);
router.use('/categories', category);
router.use('/statuses', status);
router.use('/priority', priority);
router.use('/user', user);
router.use('/userroles', userRole);

const rootDir = path.dirname(require.main.filename);
const draft_images = path.join(rootDir, "/public/uploads/draft_images");

router.use('/draft_images', express.static(draft_images));
module.exports = router;