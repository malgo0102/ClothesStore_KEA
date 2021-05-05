/* eslint-disable no-underscore-dangle */
import sequelize from '../db/index';
import { STRING, INTEGER, FLOAT, DATE } from 'sequelize'; // import data types to set our fields as for our Model

// Holds information about invoices - stored into the sequelize object from our index.js
// sequelize.define() defines a Model with a name and 
const Invoice = sequelize.define('Invoice', {
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
    timestamps: false      // Will need for migrations (maybe)
});

export default Invoice;