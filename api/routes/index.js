const express = require("express");
const ticket = require("./ticket");
const auth = require("./auth");
const category = require("./category");
const status = require('./status');
const priority = require('./priority');
const user = require('./user');
const userRole = require('./userrole');

const router = express.Router();

router.use("/ticket", ticket);
router.use("/auth", auth);
router.use('/categories', category);
router.use('/statuses', status);
router.use('/priority', priority);
router.use('/user', user);
router.use('/userroles', userRole);

module.exports = router;