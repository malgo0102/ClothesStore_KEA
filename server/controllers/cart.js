/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');

import dbConfig from '../db/db.config';

const getAllCarts = async (req, res) => {
  try {
    await dbConfig.Cart.findAll()
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

const getCart = async (req, res) => {
  try {
    await dbConfig.Cart.findByPk(req.params.id)
      .then(data => { 
        return res.status(200).json(data);
      })
      .catch(err => {
        return res.send(err);
      })
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const addCart = asyncHandler(async (req, res) => {
  try {
    await dbConfig.Cart.create(req.body)
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


module.exports.getAllCarts = getAllCarts;
module.exports.getCart = getCart;
module.exports.addCart = addCart;

