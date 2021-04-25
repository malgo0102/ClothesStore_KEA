/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');

import sequelize from '../db/index';

const Role = sequelize.models.Role;

const getAllRoles = async (req, res) => {
  try {
    await Role.findAll()
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
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong role id format. Try again.');
    }

    await Role.findByPk(req.params.id)
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

const addRole = asyncHandler(async (req, res) => {
  try {
    await Role.create(req.body)
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

const updateRole = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong role id format. Try again.');
    }
    await Role.update(req.body, {
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

const deleteRole = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json('Wrong role id format. Try again.');
    }
    await Role.destroy({
      where: {
        id: req.params.id
      }
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
