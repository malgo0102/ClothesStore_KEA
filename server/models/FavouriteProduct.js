/* eslint-disable no-underscore-dangle */
import sequelize from '../db/index';
import { INTEGER, STRING } from 'sequelize';

// Holds information about invoices - stored into the sequelize object from our index.js
const FavouriteProduct = sequelize.define('FavouriteProduct', {
    product_id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true, // Sequelize will set a default 'id' field for a Model if we don't specify it
        },
        user_id: {
            type: STRING,
            allowNull: false,
            primaryKey: true, // Setting two primary keys will create a 'composite key' in Sequelize
        }
    }, {
    tableName: 'favourite_products', // which table to map the sequelize model object to
    timestamps: false
});

export default FavouriteProduct;