const express = require("express");
const { signup, singin } = require("../controllers/auth");


const router = express.Router();


router.post("/signup", signup);
router.post("/singin", singin);

module.exports = router;