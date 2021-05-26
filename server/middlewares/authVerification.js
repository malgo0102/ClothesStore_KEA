/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable max-len */
import dbConfig from '../db/db.config';

// TO-DO: Implement same concept for creating new
// Brands,
// Roles
// and CardTypes
const verifyExistingUser = (req, res, next) => {
  dbConfig.User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(data => {
      if (!data) {
        return res.status(404).send('User not found!');
      }
      next();
    })
    .catch(err => console.log(err));
};

// TO-DO: Implement same concept for creating new
// Brands,
// Roles
// and CardTypes
const verifyNewUser = (req, res, next) => {
  dbConfig.User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(data => {
      if (data) {
        return res.status(409).send('User already exists!');
      }
      next();
    })
    .catch(err => console.log(err));
};

const authVerification = {
  verifyExistingUser,
  verifyNewUser,
};

module.exports = authVerification;
