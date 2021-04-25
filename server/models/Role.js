/* eslint-disable no-underscore-dangle */
import sequelize from '../db/index';
import { STRING } from 'sequelize';

// Holds information about roles - stored into the sequelize object from our index.js
const Role = sequelize.define('Role', {
        name: {
            type: STRING,
            allowNull: false,
            unique: true,
        }   
    }, {
    tableName: 'roles', // which table to map the sequelize model object to
    timestamps: false
});

export default Role;