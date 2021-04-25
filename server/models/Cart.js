/* eslint-disable no-underscore-dangle */
import sequelize from '../db/index';
import { INTEGER, DATE } from 'sequelize';

// Holds information about carts - stored into the sequelize object from our index.js
const Cart = sequelize.define('Cart', {
        user_id: {
            type: INTEGER,
            allowNull: false,
        },
        timestamp: {
            type: DATE,
        }
    }, {
    tableName: 'carts', // which table to map the sequelize model object to
    timestamps: false
});

export default Cart;