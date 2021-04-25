/* eslint-disable no-underscore-dangle */
import sequelize from '../db/index';
import { STRING, INTEGER, FLOAT, DATE } from 'sequelize';

// Holds information about invoices - stored into the sequelize object from our index.js
const InvoiceModel = sequelize.define('Invoice', {
        card_type_id: {
            type: INTEGER,
            allowNull: false,
        },
        card_number: {
            type: STRING,
            allowNull: false,
        },
        card_holder: {
            type: STRING,
            allowNull: false,
        },
        date: {
            type: DATE,
        },
        total_price: {
            type: FLOAT,
            allowNull: false,
        },
    }, {
    tableName: 'invoices', // which table to map the sequelize model object to
    timestamps: false
});

export default InvoiceModel;