/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');

import dbConfig from '../db/db.config';

const getAllFavourites = async (req, res) => {
  try {
    await dbConfig.FavouriteProduct.findAll()
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

const getFavourite = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9]*$/)) {
      return res.status(404).json('Wrong favourite id format. Try again.');
    }

    await dbConfig.FavouriteProduct.findByPk(req.params.id)
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

const addFavourite = asyncHandler(async (req, res) => {
  try {
    await dbConfig.FavouriteProduct.create(req.body)
      .then(data => {
        return res.status(200).json(data)
      })
      .catch(err => {
        return res.send(err);
      })
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
});

const deleteFavourite = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9]*$/)) {
      return res.status(404).json('Wrong favourite id format. Try again.');
    }
    await dbConfig.FavouriteProduct.destroy({
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

module.exports.getAllFavourites = getAllFavourites;
module.exports.getFavourite = getFavourite;
module.exports.addFavourite = addFavourite;
module.exports.deleteFavourite = deleteFavourite;
