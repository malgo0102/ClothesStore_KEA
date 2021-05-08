/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import dbConfig from '../db/db.config';

const asyncHandler = require('express-async-handler');

const getAllCartItems = async (req, res) => {
  try {
    await dbConfig.CartItem.findAll()
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const addCartItem = asyncHandler(async (req, res) => {
  try {
    await dbConfig.Cart.create(req.body)
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
});

module.exports.getAllCartItems = getAllCartItems;
module.exports.addCartItem = addCartItem;
