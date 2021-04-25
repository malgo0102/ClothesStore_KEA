/* eslint-disable no-underscore-dangle */
import sequelize from '../db/index';
import { DATE, INTEGER, STRING } from 'sequelize';

// Holds information about Users - stored into the sequelize object from our index.js
const User = sequelize.define('User', {
        role_id: {
            type: INTEGER,
            allowNull: false,
            // defaultValue: 1, // if we want a default role
        },
        first_name: {
            type: STRING,
            allowNull: false,
        },
        last_name: {
            type: STRING,
            allowNull: false,
        },
        email: {
            type: STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: STRING,
            allowNull: false,

            // hashing validation example - https://sequelize.org/master/manual/validations-and-constraints.html
            // hashedPassword: {
            //   type: DataTypes.STRING(64),
            //   is: /^[0-9a-f]{64}$/i 
        },
        date_joined: {
            type: DATE,
        },
        last_active: {
            type: DATE,
        },
        
    }, {
    tableName: 'users', // which table to map the sequelize model object to
    timestamps: false
});

export default User;

// Will delete later
// const jwt = require('jsonwebtoken');
// userSchema.methods.generateToken = () => {
//   const { JWT_SECRET, JWT_EXPIRE } = process.env;

//   const payload = {
//     id: this._id,
//   };

//   return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
// };
// const User = mongoose.model('users', userSchema);

