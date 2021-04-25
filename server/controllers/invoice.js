/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');

import sequelize from '../db/index';

const Invoice = sequelize.models.Invoice;

const getAllInvoice = async (req, res) => {
  try {
    await Invoice.findAll()
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

const getInvoice = async (req, res) => {
    try {
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json('Wrong invoice id format. Try again.');
      }
  
      await Invoice.findByPk(req.params.id)
        .then(data => { 
          return res.status(200).json(data);
        })
        .catch(err => {
          if (err) {
            return res.send(err);
          }
        })
    } catch (err) {
      return res.status(500).json('Internal server error');
    }
  };


const addInvoice = asyncHandler(async (req, res) => {
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


module.exports.getAllInvoice = getAllInvoice;
module.exports.getInvoice = getInvoice;
module.exports.addInvoice = addInvoice;

