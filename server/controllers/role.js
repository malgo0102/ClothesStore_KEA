/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import dbConfig from '../db/db.config';

const asyncHandler = require('express-async-handler');

const getAllRoles = async (req, res) => {
  try {
    await dbConfig.Role.findAll()
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const getRole = async (req, res) => {
  try {
    await dbConfig.Role.findByPk(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const addRole = asyncHandler(async (req, res) => {
  try {
    await dbConfig.Role.create(req.body)
      .then(data => res.status(201).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
});

const updateRole = async (req, res) => {
  try {
    await dbConfig.Role.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then(() => res.status(200).json())
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

const deleteRole = async (req, res) => {
  try {
    await dbConfig.Role.destroy({
      where: {
        id: req.params.id,
      },
    }).then(() => res.status(204).json())
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

module.exports.getAllRoles = getAllRoles;
module.exports.getRole = getRole;
module.exports.addRole = addRole;
module.exports.updateRole = updateRole;
module.exports.deleteRole = deleteRole;
