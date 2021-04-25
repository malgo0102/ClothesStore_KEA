const express = require('express');

const router = express.Router();

const {
  getAllCartItems, getCartItem, addCartItem,
} = require('../controllers/cardItem');

router.get('/', getAllCartItems);
router.get('/:id', getCartItem);
router.post('/', addCartItem);

module.exports = router;