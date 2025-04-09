const pool = require("../database/database");

const selectUser = async (email) => {
  const selectUserQuery = `
    SELECT * FROM users WHERE email = $1;
  `;

  try {
    const result = await pool.query(selectUserQuery, [email]);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null; // No user found
    }
  } catch (err) {
    console.error("Error querying users table:", err);
    throw err;
  }
};

module.exports = {
  selectUser,
};
