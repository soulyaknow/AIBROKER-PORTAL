const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const updateRoutes = require("./routes/updateRoutes");
const { verifySupabaseToken } = require("./middleware/supabaseAuth");
const path = require("path");

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Local and Production
const allowedOrigins = ["http://localhost:1499", "https://www.ai-broker.ai"];

// CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// API routes
app.use("/api", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api", updateRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running on port");
});

// 🔒 Protected route using Supabase JWT
app.get("/api/protected", verifySupabaseToken, (req, res) => {
  res.json({ message: "Secure data", user: req.user });
});

// Start the server
const port = process.env.PORT || 1500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
