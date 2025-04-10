const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// CORS setup
app.use(
  cors({
    origin: "http://localhost:1499",
    credentials: true,
  })
);

// API routes
app.use("/api", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running on port");
});

// Start the server
const port = process.env.PORT || 1500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
