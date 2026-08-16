const notFoundHandler = (req, res, _next) => {
  res.status(404).json({
    status: "error",
    statusCode: 404,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};

module.exports = notFoundHandler;
