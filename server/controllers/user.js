/* eslint-disable no-console */
const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken"); // implementation pending
const bcrypt = require("bcryptjs");

import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    await User.findAll()
          .then(data => {
            return res.status(200).json(data);
          })
          .catch(err => {
            return res.status(404).send(err);
          })
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

export const getUser = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9]*$/)) {
      return res.status(404).json('No user found');
    }
    await User.findByPk(req.params.id)
          .then(data => { 
            return res.status(200).json(data);
          })
          .catch(err => {
            return res.status(404).send(err);
          })
  } catch (err) {
    return res.status(500).json('Internal server error');
  }      
};

export const registerUser = asyncHandler(async (req, res) => {
  try {
    const newUser = {
      role_id: req.body.role_id,
      first_name: req.body.first_name, 
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    }
    await User.create(newUser)
          .then(data => {
            return res.json(data)
          })
          .catch(err => {
            return res.status(404).send(err);
          })
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
});

export const signInUser = asyncHandler(async (req, res)  => {
  try {
      User.findOne({
          where: {
              email: req.body.email
          }
      })
      .then(data => { 
          if(bcrypt.compareSync(req.body.password, data.password)) {
            return res.status(200).json(data)
          } else {
            return res.status(401).send("Unauthorized user, credentials do not match!");
          }
      })
      .catch(err => {
        return res.status(404).send(err);
      })
  } catch (err) {
    console.log(err);
    return res.status(500).json('Internal server error');
  }
});

