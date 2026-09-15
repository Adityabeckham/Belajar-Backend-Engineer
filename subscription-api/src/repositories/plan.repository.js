const pool = require("../config/database");

const findAllPlans = async () => {
  const query = "SELECT * FROM plans WHERE is_active = true ORDER BY created_at DESC";
  const { rows } = await pool.query(query);
  return rows;
};

const findPlanById = async (id) => {
  const query = "SELECT * FROM plans WHERE id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const createPlan = async ({ name, price, duration_days }) => {
  const query = `
    INSERT INTO plans (name, price, duration_days)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [name, price, duration_days]);
  return rows[0];
};

const updatePlan = async (id, { name, price, duration_days, is_active }) => {
  const query = `
    UPDATE plans
    SET name = COALESCE($1, name),
        price = COALESCE($2, price),
        duration_days = COALESCE($3, duration_days),
        is_active = COALESCE($4, is_active),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [name, price, duration_days, is_active, id]);
  return rows[0];
};

const deletePlan = async (id) => {
  const query = "DELETE FROM plans WHERE id = $1 RETURNING id";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  findAllPlans,
  findPlanById,
  createPlan,
  updatePlan,
  deletePlan,
};
