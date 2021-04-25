/* eslint-disable no-underscore-dangle */
import sequelize from '../db/index';
import { STRING, INTEGER, FLOAT } from 'sequelize';

// Holds information about cart_items - stored into the sequelize object from our index.js
const CartItem = sequelize.define('CartItem', {
        cart_id: {
            type: INTEGER,
            allowNull: false,
        },
        product_id: {
            type: INTEGER,
            allowNull: false,
        },
        invoice_id: {
            type: INTEGER,
            allowNull: false,
        },
        quantity: {
            type: INTEGER,
        },
        unit_price: {
            type: FLOAT,
            allowNull: false,
        }
    }, {
    tableName: 'invoices', // which table to map the sequelize model object to
    timestamps: false
});

export default CartItem;