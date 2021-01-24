const express = require("express");
const { ticket } = require("../controllers/ticket");

const router = express.Router();


router.get("/", ticket);


module.exports = router;