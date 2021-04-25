/* eslint-disable no-underscore-dangle */
import sequelize from '../db/index';
import { STRING } from 'sequelize';

// Holds information about card_types - stored into the sequelize object from our index.js
const CardType = sequelize.define('CardType', {
        names: {
            type: String,
            allowNull: false,
            unique: true,
        }
    }, {
    tableName: 'card_types', // which table to map the sequelize model object to
    timestamps: false
});

export default CardType;