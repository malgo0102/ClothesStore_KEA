/* eslint-disable no-underscore-dangle */
import {
  DATE,
  INTEGER,
  STRING,
} from 'sequelize';
import sequelize from '../db/index';

// Holds information about Users - stored into the sequelize object from our index.js
const User = sequelize.define('User', {
  role_id: {
    type: INTEGER,
    allowNull: false,
  },
  first_name: {
    type: STRING,
    allowNull: false,
  },
  last_name: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: {
      args: 'name',
      msg: 'This email is already taken!',
    },
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  date_joined: {
    type: DATE,
  },
  last_active: {
    type: DATE,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

export default User;
