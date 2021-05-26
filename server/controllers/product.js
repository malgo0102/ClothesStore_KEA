/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import dbConfig from '../db/db.config';

const asyncHandler = require('express-async-handler');

const getAllProducts = async (req, res) => {
  try {
    await dbConfig.Product.findAll()
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const getProduct = async (req, res) => {
  try {
    await dbConfig.Product.findByPk(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

// Gets only relevant products data for users to purchase products
const getProductsForUsers = async (req, res) => {
  try {
    await dbConfig.Product.findAll({
      attributes: [
        'id',
        ['name', 'product_name'],
        'unit_price',
        ['description', 'product_description'],
        'size',
      ],
      include: [{
        model: dbConfig.Brand,
        attributes: [
          ['name', 'brand_name'],
          ['description', 'brand_description'],
        ],
      }],
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const addProduct = asyncHandler(async (req, res) => {
  try {
    await dbConfig.Product.create(req.body)
      .then(data => res.status(201).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
});

const updateProduct = async (req, res) => {
  try {
    await dbConfig.Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.status(200).json())
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const deleteProduct = async (req, res) => {
  try {
    await dbConfig.Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.status(204).json())
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

module.exports.getAllProducts = getAllProducts;
module.exports.getProduct = getProduct;
module.exports.getProductsForUsers = getProductsForUsers;
module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
