/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');

import { Invoice, Cart, CartItem, Sequelize } from '../db/db.config';


const getAllInvoices = async (req, res) => {
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
      if (!req.params.id.match(/^[0-9]*$/)) {
        return res.status(404).json('Wrong invoice id format. Try again.');
      }

      await Invoice.findByPk(req.params.id)
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

// Unmanaged transactions: https://sequelize.org/master/manual/transactions.html

const addInvoice = asyncHandler(async (req, res) => {
    const t = await Sequelize.transaction();
  try {
    //const cart = await Cart.create(req.body.cart, { transaction: t });
    const invoice = await Invoice.create(req.body.invoice, { transaction: t });
    // const cart_items = await CartItem.create(req.body.cart_items, { transaction: t });

    await t.commit().then(() => {
        return res.status(200);
    });

  } catch (err) {
      await t.rollback().then(() => {
          return res.status(500).json('Internal server error: ' + err);
      });
  }
});

// const addInvoice = asyncHandler(async (req, res) => {
//   try {
//     await Invoice.create(req.body)
//       .then(data => {
//         return res.status(200).json(data)
//       })
//       .catch(err => {
//         return res.send(err);
//       })
//
//   } catch (err) {
//     return res.status(500).json('Internal server error');
//   }
// });


module.exports.getAllInvoices = getAllInvoices;
module.exports.getInvoice = getInvoice;
module.exports.addInvoice = addInvoice;

