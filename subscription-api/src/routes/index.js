const express = require("express");
const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");
const planRoutes = require("./plan.routes");
const subscriptionRoutes = require("./subscription.routes");

const router = express.Router();

// Base health endpoints
router.use("/", healthRoutes);

// API v1 routes
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/plans", planRoutes);
router.use("/api/v1/subscriptions", subscriptionRoutes);

module.exports = router;
