/* eslint-disable no-underscore-dangle */
import { DATE, INTEGER, STRING } from 'sequelize';
import sequelize from '../db/index';

// Holds information about Users - stored into the sequelize object from our index.js
const User = sequelize.define('User', {
  role_id: {
    type: INTEGER,
    allowNull: false,
    // defaultValue: 1, // if we want a default role?
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
  },
  date_joined: {
    type: DATE,
  },
  last_active: {
    type: DATE,
  },
}, {
  tableName: 'users', // which table to map the sequelize model object to
  timestamps: false,
});

export default User;

// Will delete later after figuring out JWT Authentication
// const jwt = require('jsonwebtoken');
// userSchema.methods.generateToken = () => {
//   const { JWT_SECRET, JWT_EXPIRE } = process.env;

//   const payload = {
//     id: this._id,
//   };

//   return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
// };
// const User = mongoose.model('users', userSchema);
