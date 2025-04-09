const pool = require("../database/database");

const createUserTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      fullname VARCHAR(50) NOT NULL,
      email VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      contactNumber VARCHAR(50) NOT NULL,
      companyName VARCHAR(50) NOT NULL,
      roles VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("Users table created successfully or already exists");
  } catch (err) {
    console.error("Error creating Users table:", err);
    throw err;
  }
};

module.exports = { createUserTable };
