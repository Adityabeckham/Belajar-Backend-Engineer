const env = require("./config/env");
const logger = require("./utils/logger");
const app = require("./app");
const pool = require("./config/database");

const server = app.listen(env.PORT, async () => {
  logger.info(`Server running in ${env.NODE_ENV} mode on http://localhost:${env.PORT}`);
  try {
    const result = await pool.query("SELECT NOW()", []);
    logger.info(`Database connected: ${result.rows[0].now}`);
  } catch (error) {
    logger.error("Database connection failed", error);
    process.exit(1);
  }
});

const handleShutdown = (signal) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    logger.info("HTTP server closed.");
    try {
      await pool.end();
      logger.info("Database pool closed.");
    } catch (err) {
      logger.error("Error closing database pool:", err);
    }
    process.exit(0);
  });
};

process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));
