const express = require("express");
const {  getUserRoles } = require("../controllers/user");
const { getAccessToRoute } = require('../middlewares/auth/auth');


const route = express.Router();

route.use(getAccessToRoute);

route.get("/", getUserRoles);

module.exports = route;