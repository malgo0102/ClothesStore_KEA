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

const getDiscountedProductsWithProcedure = async (req, res) => {
  try {
    const query = 'CALL get_products_with_discount(:brand_name, :discount);';

    await dbConfig.Sequelize.query(query, {
      replacements: {
        brand_name: req.params.brand_name,
        discount: req.params.discount,
      },
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err));
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
module.exports.getDiscountedProductsWithProcedure = getDiscountedProductsWithProcedure;
module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
