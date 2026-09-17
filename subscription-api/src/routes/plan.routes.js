const express = require("express");
const { getPlans, createPlan, updatePlan, deletePlan } = require("../controllers/plan.controller");
const authenticate = require("../middlewares/auth.middleware");
const requireRole = require("../middlewares/role.middleware");

const router = express.Router();

// Public: Anyone can view active plans
router.get("/", getPlans);

// Admin Only: Create, Update, Delete plans
router.post("/", authenticate, requireRole("admin"), createPlan);
router.put("/:id", authenticate, requireRole("admin"), updatePlan);
router.delete("/:id", authenticate, requireRole("admin"), deletePlan);

module.exports = router;
