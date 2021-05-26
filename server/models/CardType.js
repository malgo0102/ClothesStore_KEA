/* eslint-disable no-underscore-dangle */
import sequelize from '../db/index';

// Holds information about card_types - stored into the sequelize object from our index.js
const CardType = sequelize.define('CardType', {
  name: {
    type: String,
    allowNull: false,
    unique: {
      args: 'name',
      msg: 'This card type name is already taken!',
    },
  },
}, {
  tableName: 'card_types', // which table to map the sequelize model object to
  timestamps: false,
});

export default CardType;
