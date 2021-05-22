/* eslint-disable consistent-return */
/* eslint-disable no-console */
import dbConfig from '../db/db.config';

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

export const getAllUsers = async (req, res) => {
  try {
    await dbConfig.User.findAll()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err));
  } catch (err) {
    console.log(err);
    return res.status(500).json('Internal server error');
  }
};

export const getUser = async (req, res) => {
  try {
    await dbConfig.User.findByPk(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err));
  } catch (err) {
    console.log(err);
    return res.status(500).json('Internal server error');
  }
};

export const getUsersByView = async (req, res) => {
  try {
    const query = 'SELECT * FROM v_users';

    await dbConfig.Sequelize.query(
      query,
      { type: dbConfig.Sequelize.QueryTypes.SELECT },
    )
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err));
  } catch (err) {
    console.log(err);
    return res.status(500).json('Internal server error');
  }
};

export const getUsersInfoByView = async (req, res) => {
  try {
    const query = 'SELECT * FROM v_users_info';

    await dbConfig.Sequelize.query(
      query,
      { type: dbConfig.Sequelize.QueryTypes.SELECT },
    )
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err));
  } catch (err) {
    console.log(err);
    return res.status(500).json('Internal server error');
  }
};

export const deleteUser = async (req, res) => {
  try {
    await dbConfig.User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(data => res.status(204).json(data))
      .catch(err => res.status(404).send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

// Authentication functions (Sign up / Sign in)
export const signUpUser = asyncHandler(async (req, res) => {
  try {
    const newUser = {
      role_id: req.body.role_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 12),
    };
    await dbConfig.User.create(newUser)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(404).send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
});

export const signInUser = asyncHandler(async (req, res) => {
  try {
    dbConfig.User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then(data => {
        if (!bcrypt.compareSync(req.body.password, data.password)) {
          return res.status(401).send('Unauthorized user, credentials do not match!');
        }
        const token = jwt.sign({
          id: data.id,
        }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return res.status(200).send({
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          role_id: data.role_id,
          accessToken: token,
        });
      })
      .catch(err => res.status(404).send(err));
  } catch (err) {
    console.log(err);
    return res.status(500).json('Internal server error');
  }
});
