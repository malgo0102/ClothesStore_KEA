/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');

import sequelize from '../db/index';

const Brand = sequelize.models.Brand;

const getAllBrands = async (req, res) => {
  try {
    await Brand.findAll()
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

const getBrand = (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong brand id format. Try again.');
    }
    await Brand.findByPk(req.params.id)
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

const addBrand = asyncHandler(async (req, res) => {
  try {
    await Brand.create(req.body)
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

const updateBrand = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong brand id format. Try again.');
    }
    await Brand.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .catch(err => {
      if (err) {
        return res.send(err);
      }
    });
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const deleteBrand = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong brand id format. Try again.');
    }
    await Brand.destroy({
      where: {
        id: req.params.id
      }
    });
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

module.exports.getAllBrands = getAllBrands;
module.exports.getBrand = getBrand;
module.exports.addBrand = addBrand;
module.exports.updateBrand = updateBrand;
module.exports.deleteBrand = deleteBrand;
