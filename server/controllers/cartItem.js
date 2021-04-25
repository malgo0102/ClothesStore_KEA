/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');

import sequelize from '../db/index';

const CartItem = sequelize.models.CartItem;

const getAllCartsItem = async (req, res) => {
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
        return res.json(data)
      })
      .catch(err => {
        if (err) {
          return res.send(err);
        }
      })
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
});


module.exports.getAllCartsItem = getAllCartsItem;
module.exports.addCartItem = addCartItem;

