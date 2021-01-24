const express = require("express");
const {getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/category');
const {getAccessToRoute, userRoleMiddleware} = require("../middlewares/auth/auth");
const {UserRoles} = require("../helpers/auth/userRoles");

const router = express.Router();

router.use(getAccessToRoute);
//userRoleMiddleware()

router.get('/', getCategories);
router.post('/',userRoleMiddleware([UserRoles.CanCreateCategory]), createCategory);
router.put('/:id',userRoleMiddleware([UserRoles.CanCreateCategory]), updateCategory);
router.delete('/:id', userRoleMiddleware([UserRoles.CanDeleteCategory]), deleteCategory);



module.exports = router;