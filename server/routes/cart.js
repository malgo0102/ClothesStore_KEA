const express = require('express');
import { authJwt, authParams }  from '../middlewares/auth';

const router = express.Router();

const {
  getAllCarts, getCart, addCart,
} = require('../controllers/cart');

router.get('/', getAllCarts);
router.get('/:id', [authParams.verifyIdParam, getCart]);
router.post('/', addCart);

module.exports = router;