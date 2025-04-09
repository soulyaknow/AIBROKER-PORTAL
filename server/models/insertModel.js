const pool = require("../database/database");

const insertUser = async (
  fullName,
  email,
  hashpassword,
  contactNumber,
  companyName,
  roles
) => {
  const insertUserQuery = `
    INSERT INTO users (fullName, email, password, contactNumber, companyName, roles)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  try {
    const result = await pool.query(insertUserQuery, [
      fullName,
      email,
      hashpassword,
      contactNumber,
      companyName,
      roles,
    ]);
    console.log("✅ User inserted successfully");
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error inserting user:", err.message);
    throw err;
  }
};

module.exports = { insertUser };
