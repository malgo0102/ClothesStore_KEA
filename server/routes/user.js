import {
  authJwt,
  authParams,
  authVerification,
} from '../middlewares/auth';

const express = require('express');

const router = express.Router();

const {
  getAllUsers,
  getUser,
  signInUser,
  signUpUser,
  deleteUser,
} = require('../controllers/user');

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Use to request all users
 *     responses:
 *       '200':
 *         description: A successful response, returned all users
 *       '500':
 *         description: Internal server error
 * /api/users/:id:
 *   get:
 *     description: Use to request user
 *     responses:
 *       '200':
 *         description: A successful response, returned user
 *       '500':
 *         description: Internal server error
 *   delete:
 *     description: Use to delete user
 *     responses:
 *       '200':
 *         description: A successful response, deleted user
 *       '500':
 *         description: Internal server error
 * /api/users/signup:
 *   post:
 *     description: Use to add new user
 *     responses:
 *       '200':
 *         description: A successful response, added new user
 *       '500':
 *         description: Internal server error
 * /api/users/signin:
 *   post:
 *     description: Use to log in
 *     responses:
 *       '200':
 *         description: A successful response, user logged in
 *       '500':
 *         description: Internal server error
 */

router.get('/', [authJwt.verifyToken, authJwt.isAdmin, getAllUsers]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isEmployeeOrAdmin, getUser]);
router.post('/signup', [authVerification.verifyNewUser, signUpUser]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteUser]);
router.post('/signin', [authVerification.verifyExistingUser, signInUser]);

// TODO - put - updateUser (isAdmin) (with access to route) - update swagger
// TODO - get - see user profile (with access to route) - update swagger
// TODO - put - update user profile (with access to route) - update swagger

module.exports = router;
