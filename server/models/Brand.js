/* eslint-disable no-underscore-dangle */
import {
  STRING,
} from 'sequelize';
import sequelize from '../db/index';

// Holds information about brands - stored into the sequelize object from our index.js
const Brand = sequelize.define('Brand', {
  name: {
    type: STRING,
    allowNull: false,
    unique: {
      args: 'name',
      msg: 'This brand name is already taken!',
    },
  },
  description: {
    type: STRING,
    allowNull: false,
  },

}, {
  tableName: 'brands',
  timestamps: false,
});

export default Brand;
