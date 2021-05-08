/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
import dbConfig from '../db/db.config';

// Checks if a User credentials match - Probably don't need
const verifySignUp = (req, res, next) => {

};

// Checks if new User does not already exists (email field in users table is unique) - needs refactoring
const verifyNewUser = user => {
  dbConfig.User.findOne({
    where: {
      // eslint-disable-next-line indent
                email: user.email,
    },
  })
    .then(data => {
      if (data) {
        return true;
      }
      return false;
    })
    .catch(err => {
      console.log(err);
    });
};

const authVerification = {
  verifySignUp,
  verifyNewUser,
};

module.exports = authVerification;
