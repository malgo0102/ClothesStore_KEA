/* eslint-disable no-underscore-dangle */
import {
  INTEGER,
  STRING,
  FLOAT,
} from 'sequelize';
import sequelize from '../db/index';

// Holds information about products - stored into the sequelize object from our index.js
const Product = sequelize.define('Product', {
  brand_id: {
    type: INTEGER,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  unit_price: {
    type: FLOAT,
    allowNull: false,
  },
  rating: {
    type: INTEGER,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
  size: {
    type: STRING,
    allowNull: false,
  },
}, {
  tableName: 'products', // which table to map the sequelize model object to
  timestamps: false,
});

export default Product;
