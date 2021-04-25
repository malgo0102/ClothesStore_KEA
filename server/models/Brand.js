/* eslint-disable no-underscore-dangle */
import sequelize from '../db/index';
import { STRING } from 'sequelize';

// Holds information about brands - stored into the sequelize object from our index.js
const Brand = sequelize.define('Brand', {
  name: {
    type: STRING,
    allowNull: false,
    unique: {
      args: 'name',
      msg: 'The email is already taken!'
   }
  },
  description: {
    type: STRING,
    allowNull: false,
  },
        
}, {
  tableName: 'brands', // which table to map the sequelize model object to
  timestamps: false,
});

export default Brand;
