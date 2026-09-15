const subscriptionService = require("../services/subscription.service");

const createSubscription = async (req, res, next) => {
  try {
    const { userId, planId } = req.body;
    const subscription = await subscriptionService.createSubscription({ userId, planId });
    res.status(201).json({ status: "success", data: subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubscription,
};
