import { authJwt, authParams } from '../middlewares/auth';

const express = require('express');

const router = express.Router();

const {
  getAllCardTypes, getCardType, updateCardType, addCardType, deleteCardType,
} = require('../controllers/cardType');

router.get('/', getAllCardTypes);
router.get('/:id', [authParams.verifyIdParam, getCardType]);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, addCardType]);
router.put('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, updateCardType]);
router.delete('/:id', [authParams.verifyIdParam, authJwt.verifyToken, authJwt.isAdmin, deleteCardType]);

module.exports = router;
