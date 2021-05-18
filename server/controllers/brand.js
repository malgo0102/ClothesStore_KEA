/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import dbConfig from '../db/db.config';

const asyncHandler = require('express-async-handler');

const getAllBrands = async (req, res) => {
  try {
    dbConfig.Brand.findAll()
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json(`Internal server error: ${err}`);
  }
};

const getBrand = async (req, res) => {
  try {
    await dbConfig.Brand.findByPk(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const addBrand = asyncHandler(async (req, res) => {
  try {
    await dbConfig.Brand.create(req.body)
      .then(data => res.status(200).json(data))
      .catch(err => {
        console.log(err);
        return res.send(err);
      });
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
});

const updateBrand = async (req, res) => {
  try {
    await dbConfig.Brand.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const deleteBrand = async (req, res) => {
  try {
    await dbConfig.Brand.destroy({
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

module.exports.getAllBrands = getAllBrands;
module.exports.getBrand = getBrand;
module.exports.addBrand = addBrand;
module.exports.updateBrand = updateBrand;
module.exports.deleteBrand = deleteBrand;
