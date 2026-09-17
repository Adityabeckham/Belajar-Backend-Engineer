const express = require("express");
const { createSubscription } = require("../controllers/subscription.controller");
const authenticate = require("../middlewares/auth.middleware");

const router = express.Router();

// Protected: Authenticated users can create subscription
router.post("/", authenticate, createSubscription);

module.exports = router;
