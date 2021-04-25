/* eslint-disable no-underscore-dangle */
import sequelize from '../db/index';
import { INTEGER } from 'sequelize';

// Holds information about invoices - stored into the sequelize object from our index.js
const FavouriteProductModel = sequelize.define('FavouriteProduct', {
    product_id: {
            type: INTEGER,
            allowNull: false,
        },
        user_id: {
            type: STRING,
            allowNull: false,
        }
    }, {
    tableName: 'favourite_products', // which table to map the sequelize model object to
    timestamps: false
});

export default FavouriteProductModel;