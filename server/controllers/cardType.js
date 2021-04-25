/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');

import sequelize from '../db/index';

const CardType = sequelize.models.CardType;

const getAllCardTypes = async (req, res) => {
  try {
    await CardType.findAll()
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

const getCardType = (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong card type id format. Try again.');
    }

    await CardType.findByPk(req.params.id)
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

const addCardType = asyncHandler(async (req, res) => {
  try {
    await CardType.create(req.body)
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

const updateCardType = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong card type id format. Try again.');
    }
    await CardType.update(req.body, {
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

const deleteCardType = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong role id format. Try again.');
    }
    await CardType.destroy({
      where: {
        id: req.params.id
      }
    });
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

module.exports.getAllCardTypes = getAllCardTypes;
module.exports.getCardType = getCardType;
module.exports.addCardType = addCardType;
module.exports.updateCardType = updateCardType;
module.exports.deleteCardType = deleteCardType;
