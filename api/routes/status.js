const express = require('express');
const { getStasuses,     createStatus,     updateStatus,     deleteStatus} = require('../controllers/status');
const UserRoles = require('../helpers/auth/userRoles');
const {getAccessToRoute, userRoleMiddleware} =require('../middlewares/auth/auth');

const router = express.Router();

router.use(getAccessToRoute);


router.get('/', getStasuses);
router.post('/', userRoleMiddleware(UserRoles.CanCreateStatus), createStatus);
router.put('/:id', userRoleMiddleware(UserRoles.CanCreateStatus), updateStatus);
router.delete('/:id',userRoleMiddleware(UserRoles.CanDeleteStatus), deleteStatus);


module.exports = router;