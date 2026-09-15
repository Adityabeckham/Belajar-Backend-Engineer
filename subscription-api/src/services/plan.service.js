const planRepository = require("../repositories/plan.repository");

const getAllPlans = () => planRepository.findAllPlans();

const createPlan = (data) => planRepository.createPlan(data);

const updatePlan = async (id, data) => {
  const updated = await planRepository.updatePlan(id, data);
  if (!updated) {
    const error = new Error("Plan not found");
    error.statusCode = 404;
    throw error;
  }
  return updated;
};

const deletePlan = async (id) => {
  const deleted = await planRepository.deletePlan(id);
  if (!deleted) {
    const error = new Error("Plan not found");
    error.statusCode = 404;
    throw error;
  }
  return deleted;
};

module.exports = {
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan,
};
