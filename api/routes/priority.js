const express = require('express');
const {getAccessToRoute, userRoleMiddleware} = require('../middlewares/auth/auth');
const {UserRoles} = require('../helpers/auth/userRoles');
const { getPriorities, createPriorities, updatePriorities } = require('../controllers/priority');

const router = express.Router();

router.use(getAccessToRoute);

router.get('/', getPriorities);
router.post('/', userRoleMiddleware([UserRoles.CanCreatePriority]), createPriorities);
router.put('/:id', userRoleMiddleware([UserRoles.CanCreatePriority]), updatePriorities);

module.exports = router;