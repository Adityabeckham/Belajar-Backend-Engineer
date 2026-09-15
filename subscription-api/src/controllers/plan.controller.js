const planService = require("../services/plan.service");

const getPlans = async (req, res, next) => {
  try {
    const plans = await planService.getAllPlans();
    res.status(200).json({ status: "success", data: plans });
  } catch (error) {
    next(error);
  }
};

const createPlan = async (req, res, next) => {
  try {
    const newPlan = await planService.createPlan(req.body);
    res.status(201).json({ status: "success", data: newPlan });
  } catch (error) {
    next(error);
  }
};

const updatePlan = async (req, res, next) => {
  try {
    const updatedPlan = await planService.updatePlan(req.params.id, req.body);
    res.status(200).json({ status: "success", data: updatedPlan });
  } catch (error) {
    next(error);
  }
};

const deletePlan = async (req, res, next) => {
  try {
    const deletedPlan = await planService.deletePlan(req.params.id);
    res.status(200).json({ status: "success", data: deletedPlan });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
};
