import User from '../db/db.config';

var bcrypt = require("bcryptjs");

// Checks if a User credentials match
const verifySignUp = (user) => {
    User.findOne({
            where: {
                email: user.email
            }
        })
        .then(data => { 
            if(bcrypt.compareSync(user.password, data.password)) {
                return true;
            } else {
                return false;
            }
        })
        .catch(err => {
            console.log(err);
        })
}

// Checks if new User does not already exists (email field in users table is unique)
const verifyNewUser = (user) => {
    User.findOne({
            where: {
                email: user.email
            }
        })
        .then(data => { 
            if (data) {
                return true
            } else {
                return false
            }   
        })
        .catch(err => {
            console.log(err);
        })  
}

const authVerification = {
        verifySignUp: verifySignUp,
        verifyNewUser: verifyNewUser
    };

module.exports = authVerification;