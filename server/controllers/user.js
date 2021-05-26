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

// Don't really need anymore; getUsersInfoForAdmin does a better job
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

// Only gets information about the current user profile
export const getUserProfile = async (req, res) => {
  try {
    await dbConfig.User.findByPk(
      req.params.id,
      {
        attributes: [
          'first_name',
          'last_name',
          'email',
          'password',
        ],
      },
    )
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err));
  } catch (err) {
    console.log(err);
    return res.status(500).json('Internal server error');
  }
};

// Gets only non-safety-violating user information of employees and customers for employees
export const getUsersInfoForEmployees = async (req, res) => {
  try {
    await dbConfig.User.findAll({
      where: {
        [dbConfig.Op.or]: [
          { role_id: 3 },
          { role_id: 2 },
        ],
      },
      attributes: [
        'first_name',
        'last_name',
        'email',
      ],
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
    return res.status(500).json('Internal server error');
  }
};

// Gets user information of employees and customers for the admin
export const getUsersInfoForAdmin = async (req, res) => {
  try {
    await dbConfig.User.findAll({
      where: {
        [dbConfig.Op.or]: [
          { role_id: 3 },
          { role_id: 2 },
        ],
      },
      attributes: [
        'id',
        'first_name',
        'last_name',
        'email',
        'password',
        'date_joined',
        'last_active',
      ],
      include: [{
        model: dbConfig.Role,
        attributes: [
          ['name', 'role'],
        ],
      }],
    })
      .then(data => res.status(200).json(data))
      .catch(err => res.send(err));
  } catch (err) {
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

export const updateUser = async (req, res) => {
  try {
    await dbConfig.User.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.status(200).json())
      .catch(err => res.send(err));
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
