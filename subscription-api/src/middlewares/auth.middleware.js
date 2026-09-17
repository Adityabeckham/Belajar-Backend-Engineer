const jwt = require("jsonwebtoken");
const env = require("../config/env");
const logger = require("../utils/logger");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Authorization token is required",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    logger.debug(`Authentication failed: ${err.message}`);
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Invalid or expired authorization token",
    });
  }
};

module.exports = authenticate;
