const express = require("express");
const healthRoutes = require("./health.routes");

const router = express.Router();

// Base health endpoints
router.use("/", healthRoutes);

module.exports = router;
