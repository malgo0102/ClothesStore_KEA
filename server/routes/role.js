import { authJwt, authParams } from '../middlewares/auth';

const express = require('express');

const router = express.Router();

const {
  getAllRoles, getRole, updateRole, addRole, deleteRole,
} = require('../controllers/role');

router.get('/', [authJwt.isAdmin, authJwt.verifyToken, getAllRoles]);
router.get('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, getRole]);
router.post('/', [authJwt.isAdmin, authJwt.verifyToken, addRole]);
router.put('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, updateRole]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteRole]);

module.exports = router;
