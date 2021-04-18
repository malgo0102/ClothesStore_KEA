/* eslint-disable no-console */
const asyncHandler = require('express-async-handler');

import sequelize from '../db/index';

const User = sequelize.models.User;

export const getAllUsers = async (req, res) => {
  await User.findAll()
        .then(data => {
          return res.status(200).json(data);
        })
        .catch(err => {
          return res.send(err);
        })
};

export const getUser = (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json('No user found');
  }
  await User.findByPk(req.params.id)
        .then(data => { 
          return res.status(200).json(data);
        })
        .catch(err => {
          if (err) {
            return res.send(err);
          }
        })
};

export const registerUser = asyncHandler(async (req, res) => {

  await User.create(req.body)
        .then(data => {
          return res.json(data)
        })
        .catch(err => {
          if (err) {
            // check how error is display; user already exists?
            return res.send(err);
          }
        })

        // 뭐?
  // return res.status(201).json({
  //   name: user.name,
  //   email: user.email,
  //   isAdmin: user.isAdmin,
  //   token: user.generateToken(),
  // });
});

