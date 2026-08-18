const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const pinoHttp = require("pino-http");
const logger = require("./utils/logger");
const router = require("./routes");
const notFoundHandler = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");

const app = express();

// Middleware Logger
app.use(pinoHttp({ logger }));

// Middleware Security
app.use(helmet());

// Middleware CORS
app.use(cors());

// Middleware Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use(router);

// 404 Handler
app.use(notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;
