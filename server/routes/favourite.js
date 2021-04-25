const express = require('express');

const router = express.Router();

const {
  getAllFavourites, getFavourite, updateFavourite, addFavourite, deleteFavourite,
} = require('../controllers/product');

router.get('/', getAllFavourites);
router.get('/:id', getFavourite);
router.post('/', addFavourite);
router.put('/:id', updateFavourite);
router.delete('/:id', deleteFavourite);

module.exports = router;