/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');

import CartItem from '../models/CartItem.js';

const getAllCartItems = async (req, res) => {
  try {
    await CartItem.findAll()
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => {
        return res.send(err);
      });
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};


const addCartItem = asyncHandler(async (req, res) => {
  try {
    await Cart.create(req.body)
      .then(data => {
        return res.status(200).json(data)
      })
      .catch(err => {
        return res.send(err);
      })
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
});


module.exports.getAllCartItems = getAllCartItems;
module.exports.addCartItem = addCartItem;

