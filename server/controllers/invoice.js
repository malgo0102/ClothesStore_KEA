/* eslint-disable no-sequences */
/* eslint-disable max-len */
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

// TO-DO: Delete? Don't really care about single invoice information
const getInvoice = async (req, res) => {
  try {
    await dbConfig.Invoice.findByPk(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

// TO-DO: Replace getAllInvoices? Also, add to router
// Gets only invoices data without ids and card_type_id replaced with its respective card type name
const getInvoicesInfo = async (req, res) => {
  try {
    await dbConfig.Invoice.findAll({
      attributes: [
        'card_holder',
        'card_number',
        'total_price',
        'date',
      ],
      include: [{
        model: dbConfig.CardType,
        attributes: [
          ['name', 'card_type'],
        ],
      }],
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const getUserOrdersWithProcedure = async (req, res) => {
  try {
    const query = 'CALL get_user_orders(:user_id);';

    await dbConfig.Sequelize.query(query, { replacements: { user_id: req.params.id } })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const getInvoicesBetweenDatesWithProcedure = async (req, res) => {
  try {
    const query = 'CALL get_orders_between_dates(:from_date, :to_date);';

    await dbConfig.Sequelize.query(query, {
      replacements: {
        from_date: req.params.from_date, to_date: req.params.to_date,
      },
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

// Unmanaged transactions: https://sequelize.org/master/manual/transactions.html
const addInvoice = asyncHandler(async (req, res) => {
  const t = await dbConfig.Sequelize.transaction();
  try {
    const invoice = await dbConfig.Invoice.create(req.body.invoice,
      { transaction: t });
    const cartItems = Promise.all(req.body.cart_items.map(cartItem => (dbConfig.CartItem.create(cartItem),
    { transaction: t }
    ))).catch(err => res.send(err));

    // https://nodejs.dev/learn/understanding-javascript-promises
    // Synchronize different promises
    Promise.all([invoice].concat(cartItems))
      .then(() => t.commit())
      .then(data => res.status(201).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    await t.rollback().then(() => res.status(500).json(`Internal server error: ${err}`));
  }
});

// for testing in postman:
// http://localhost:8080/api/invoices/
// {
//   "invoice": {
//     "id": 3,
//     "card_type_id": 1,
//     "card_number": 11223344,
//     "card_holder": "Bob Bayes",
//     "date": "2020-06-26T15:45:00.000Z",
//     "total_price": 2600
//   },
//   "cart_items": [
//     {
//       "user_id": 1,
//       "product_id": 3,
//       "invoice_id": 3,
//       "quantity": 4,
//       "unit_price": 400
//     },
//     {
//       "user_id": 1,
//       "product_id": 2,
//       "invoice_id": 3,
//       "quantity": 2,
//       "unit_price": 1000
//     }
//   ]
// }

module.exports.getAllInvoices = getAllInvoices;
module.exports.getInvoice = getInvoice;
module.exports.getInvoicesInfo = getInvoicesInfo;
module.exports.getUserOrdersWithProcedure = getUserOrdersWithProcedure;
module.exports.getInvoicesBetweenDatesWithProcedure = getInvoicesBetweenDatesWithProcedure;
module.exports.addInvoice = addInvoice;
