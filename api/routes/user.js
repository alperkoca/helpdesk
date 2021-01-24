const express = require("express");
const { getUser, getUsers, createUser, updateUser, getUserRoles } = require("../controllers/user");
const {UserRoles} = require('../helpers/auth/userRoles');
const { getAccessToRoute, userRoleMiddleware } = require('../middlewares/auth/auth');


const route = express.Router();

route.use(getAccessToRoute);

route.get("/", getUsers);
route.get("/:id", getUser);
route.post('/',userRoleMiddleware([UserRoles.CanCreateUser]), createUser);
route.put('/:id', userRoleMiddleware([UserRoles.CanCreateUser]), updateUser);
route.get('/userroles', getUserRoles)

module.exports = route;