/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');

import dbConfig from '../db/db.config';

const getAllProducts = async (req, res) => {
    try {
        await dbConfig.Product.findAll()
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

const getProduct = async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9]*$/)) {
        return res.status(404).json('Wrong product id format. Try again.');
        }

        await dbConfig.Product.findByPk(req.params.id)
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

const addProduct = asyncHandler(async (req, res) => {
    try {
        await dbConfig.Product.create(req.body)
            .then(data => {
                return res.json(data)
            })
            .catch(err => {
                return res.send(err);
            })
    } catch (err) {
        return res.status(500).json('Internal server error');
    }
});

const updateProduct = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9]*$/)) {
      return res.status(404).json('Wrong product id format. Try again.');
    }
    await dbConfig.Product.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            return res.status(200).json();
        })
        .catch(err => {
            return res.send(err);
        });
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9]*$/)) {
      return res.status(404).json('Wrong product id format. Try again.');
    }
    await dbConfig.Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        return res.status(200).json();
    })
    .catch(err => {
        return res.send(err);
    });
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

module.exports.getAllProducts = getAllProducts;
module.exports.getProduct = getProduct;
module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
