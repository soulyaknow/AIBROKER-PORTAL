const express = require("express");
const router = express.Router();
const { edit } = require("../controllers/userController");

router.post("/editProfile", edit);
module.exports = router;
