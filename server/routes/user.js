const express = require('express');

const router = express.Router();

const { getAllUsers, getUser } = require('../controllers/user');

router.get('/', getAllUsers); // TODO - isAdmin (with access to route)
router.get('/:id', getUser); // TODO - isAdmin (with access to route)

// TODO - post - register
// TODO - post - login
// TODO - delete - deleteUser (isAdmin) (with access to route)
// TODO - put - updateUser (isAdmin) (with access to route)
// TODO - get - see user profile (with access to route)
// TODO - put - update user profile (with access to route)

module.exports = router;
