/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import dbConfig from '../db/db.config';

const asyncHandler = require('express-async-handler');

const getAllInvoices = async (req, res) => {
  try {
    await dbConfig.Invoice.findAll()
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const getInvoice = async (req, res) => {
  try {
    await dbConfig.Invoice.findByPk(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

// Unmanaged transactions: https://sequelize.org/master/manual/transactions.html
const addInvoice = asyncHandler(async (req, res) => {
  const t = await dbConfig.Sequelize.transaction();
  try {
    const invoice = await dbConfig.Invoice.create(req.body.invoice, { transaction: t })
    const cart_items = await dbConfig.CartItem.create(req.body.cart_item, { transaction: t });
    // https://nodejs.dev/learn/understanding-javascript-promises
    // Synchronize different promises
    Promise.all([invoice, cart_items])
        .then(() => t.commit())
        .then(data => res.status(200).json(data))
        .catch(err => res.send(err));
  } catch (err) {
    await t.rollback().then(() => res.status(500).json(`Internal server error: ${err}`));
  }
});

// for testing in postman:
// http://localhost:8080/api/invoices/
// {
//   "invoice": {
//   "id": 3,
//       "card_type_id": 1,
//       "card_number": 11223344,
//       "card_holder": "Bob Bayes",
//       "date": "2020-06-26T15:45:00.000Z",
//       "total_price": 1600
// },
//   "cart_item": {
//   "user_id": 1,
//       "product_id": 3,
//       "invoice_id": 3,
//       "quantity": 4,
//       "unit_price": 400
// }
// }


module.exports.getAllInvoices = getAllInvoices;
module.exports.getInvoice = getInvoice;
module.exports.addInvoice = addInvoice;
