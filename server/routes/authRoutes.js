const express = require("express");
const router = express.Router();
const { signup, signin, users } = require("../controllers/userController");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/user", users);
module.exports = router;
