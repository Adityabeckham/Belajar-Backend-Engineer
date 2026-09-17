const env = require("../config/env");
const jwt = require("jsonwebtoken");

exports.signJWT = (payload, options = {}) => {
  return jwt.sign(payload, env.JWT_SECRET, options);
};

exports.verifyJWT = (token, options = {}) => {
  return jwt.verify(token, env.JWT_SECRET, options);
};
