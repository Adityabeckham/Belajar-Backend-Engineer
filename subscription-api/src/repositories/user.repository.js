const pool = require("../config/database");

const findUserById = async (id) => {
  const query = "SELECT id, email, name, role, created_at, updated_at FROM users WHERE id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

const createUser = async ({ email, password, name }) => {
  const query = `
    INSERT INTO users (email, password, name)
    VALUES ($1, $2, $3)
    RETURNING id, email, name, role, created_at;
  `;
  const { rows } = await pool.query(query, [email, password, name]);
  return rows[0];
};

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
};
