/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');

import dbConfig from '../db/db.config';

const getAllCardTypes = async (req, res) => {
  try {
    await dbConfig.CardType.findAll()
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

const getCardType = async (req, res) => {
  try {
    await dbConfig.CardType.findByPk(req.params.id)
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

const addCardType = asyncHandler(async (req, res) => {
  try {
    await dbConfig.CardType.create(req.body)
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

const updateCardType = async (req, res) => {
  try {
    await dbConfig.CardType.update(req.body, {
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

const deleteCardType = async (req, res) => {
  try {
    await dbConfig.CardType.destroy({
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

module.exports.getAllCardTypes = getAllCardTypes;
module.exports.getCardType = getCardType;
module.exports.addCardType = addCardType;
module.exports.updateCardType = updateCardType;
module.exports.deleteCardType = deleteCardType;
