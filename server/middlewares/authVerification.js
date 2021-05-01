import User from '../models/User.js';

var bcrypt = require("bcryptjs");

// Implementation pending
const verifySignUp = (user) => {
    
}

const authVerification = {
        verifySignUp: verifySignUp
    };

module.exports = authVerification;