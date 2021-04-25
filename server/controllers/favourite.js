/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');

import sequelize from '../db/index';

const Favourite = sequelize.models.Favourite;

const getAllFavourites = async (req, res) => {
  try {
    await Favourite.findAll()
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

const getFavourite = (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong favourite id format. Try again.');
    }

    await Favourite.findByPk(req.params.id)
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

const addFavourite = asyncHandler(async (req, res) => {
  try {
    await Favourite.create(req.body)
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

const deleteFavourite = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong favourite id format. Try again.');
    }
    await Favourite.destroy({
      where: {
        id: req.params.id
      }
    });
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

module.exports.getAllFavourites = getAllFavourites;
module.exports.getFavourite = getFavourite;
module.exports.addFavourite = addFavourite;
module.exports.deleteFavourite = deleteFavourite;
