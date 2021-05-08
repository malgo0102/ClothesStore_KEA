/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import dbConfig from '../db/db.config';

const asyncHandler = require('express-async-handler');

const getAllCarts = async (req, res) => {
  try {
    await dbConfig.Cart.findAll()
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const getCart = async (req, res) => {
  try {
    await dbConfig.Cart.findByPk(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const addCart = asyncHandler(async (req, res) => {
  try {
    await dbConfig.Cart.create(req.body)
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
});

module.exports.getAllCarts = getAllCarts;
module.exports.getCart = getCart;
module.exports.addCart = addCart;
