const express = require('express');

const router = express.Router();

const {
  getAllCartItems, addCartItem,
} = require('../controllers/cartItem');

router.get('/', getAllCartItems);
router.post('/', addCartItem);

module.exports = router;