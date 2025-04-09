const { createUserTable } = require("../models/createModel");
const { insertUser } = require("../models/insertModel");
const { selectUser } = require("../models/selectModel");
const { sendToken } = require("../middleware/auth");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {
  const { fullName, email, password, contactNumber, companyName } = req.body;

  if (!fullName || !email || !password || !contactNumber || !companyName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // creating table
    await createUserTable();

    // Hash the password using bcrypt
    const saltRounds = 10; // You can adjust the number of salt rounds
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = await insertUser(
      fullName,
      email,
      hashPassword,
      contactNumber,
      companyName,
      1
    );

    if (!user) {
      return res.status(401).json({ message: "Failed to create user" });
    }

    // Return a success response with the created user
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Try to find the user in the users table first
    const user = await selectUser(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If authentication is successful, send the token (JWT)
    sendToken(user, 200, res);
  } catch (error) {
    next(error); // Handle any server or database errors
  }
};
