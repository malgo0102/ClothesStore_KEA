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
    return res.status(500).json(`Internal server error: ${err}`);
  }
};

// add cart item handled in controllers/invoice.js in the transaction in the object addInvoice

module.exports.getAllCartItems = getAllCartItems;

