const express = require('express');

const router = express.Router();

const {
  getAllCarts, getCart, addCart,
} = require('../controllers/cardItem');

router.get('/', getAllCarts);
router.get('/:id', getCart);
router.post('/', addCart);

module.exports = router;