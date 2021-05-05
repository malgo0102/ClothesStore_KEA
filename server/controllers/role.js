/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');

import dbConfig from '../db/db.config';

const getAllRoles = async (req, res) => {
  try {
    await dbConfig.Role.findAll()
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

const getRole = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9]*$/)) {
      return res.status(404).json('Wrong role id format. Try again.');
    }

    await dbConfig.Role.findByPk(req.params.id)
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

const addRole = asyncHandler(async (req, res) => {
  try {
    await dbConfig.Role.create(req.body)
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

const updateRole = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9]*$/)) {
      return res.status(404).json('Wrong role id format. Try again.');
    }
    await dbConfig.Role.update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(() => {
        return res.status(200).json();
      })
      .catch(err => {
        return res.send(err);
      });
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const deleteRole = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9]*$/)) {
      return res.status(404).json('Wrong role id format. Try again.');
    }
    await dbConfig.Role.destroy({
        where: {
          id: req.params.id
        }
      }).then(() => {
        return res.status(200).json();
      })
      .catch(err => {
        return res.send(err);
      });
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

module.exports.getAllRoles = getAllRoles;
module.exports.getRole = getRole;
module.exports.addRole = addRole;
module.exports.updateRole = updateRole;
module.exports.deleteRole = deleteRole;
