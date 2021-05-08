import { authJwt, authParams } from '../middlewares/auth';

const express = require('express');

const router = express.Router();

const {
  getAllUsers, getUser, signInUser, signUpUser, deleteUser,
} = require('../controllers/user');

router.get('/', [authJwt.verifyToken, authJwt.isAdmin, getAllUsers]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getUser]);
router.post('/signup', signUpUser);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteUser]);
router.post('/signin', signInUser);

// TODO - put - updateUser (isAdmin) (with access to route)
// TODO - get - see user profile (with access to route)
// TODO - put - update user profile (with access to route)

module.exports = router;
