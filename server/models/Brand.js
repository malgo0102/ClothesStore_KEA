/* eslint-disable no-underscore-dangle */
import sequelize from '../db/index';
import { STRING } from 'sequelize';

// Holds information about brands - stored into the sequelize object from our index.js
const BrandModel = sequelize.define('Brand', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
        
}, {
  tableName: 'brands', // which table to map the sequelize model object to
  timestamps: false,
});

export default BrandModel;
