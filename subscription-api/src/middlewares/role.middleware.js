const logger = require("../utils/logger");

const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      logger.warn(
        `Forbidden access attempt by user ${req.user?.id || "unknown"} with role ${req.user?.role}`
      );
      return res.status(403).json({
        status: "error",
        statusCode: 403,
        message: "Forbidden: You do not have permission to perform this action",
      });
    }
    next();
  };
};

module.exports = requireRole;
