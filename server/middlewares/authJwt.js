const jwt = require("jsonwebtoken");
import User from '../models/User.js';

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.id = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.id).then(user => {
        if (user.role_id === 1) {
          next();
          return;
        }
        res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
};

const isEmployee = (req, res, next) => {
    User.findByPk(req.id).then(user => {
        if (user.role_id === 2) {
            next();
            return;
        }
        res.status(403).send({
        message: "Require Employee Role!"
        });
    });
};

const isEmployeeOrAdmin = (req, res, next) => {
    User.findByPk(req.id).then(user => {
        if (user.role_id === 1 || user.role_id === 2) {
            next();
            return;
        }
         res.status(403).send({
            message: "Require Employee or Admin Role!"
        });
    });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isEmployee,
  isModeratorOrAdmin: isEmployeeOrAdmin
};
module.exports = authJwt;