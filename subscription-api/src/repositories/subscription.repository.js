const pool = require("../config/database");

const findActiveSubscriptionByUserId = async (userId, client = pool) => {
  const query = `
    SELECT * FROM subscriptions 
    WHERE user_id = $1 AND status = 'ACTIVE' AND end_date > CURRENT_TIMESTAMP
    LIMIT 1;
  `;
  const { rows } = await client.query(query, [userId]);
  return rows[0];
};

const createSubscriptionWithClient = async (client, { userId, planId, startDate, endDate }) => {
  const query = `
    INSERT INTO subscriptions (user_id, plan_id, start_date, end_date, status)
    VALUES ($1, $2, $3, $4, 'ACTIVE')
    RETURNING *;
  `;
  const { rows } = await client.query(query, [userId, planId, startDate, endDate]);
  return rows[0];
};

const updateSubscriptionStatus = async (id, status) => {
  const query = `
    UPDATE subscriptions
    SET status = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [status, id]);
  return rows[0];
};

module.exports = {
  findActiveSubscriptionByUserId,
  createSubscriptionWithClient,
  updateSubscriptionStatus,
};
