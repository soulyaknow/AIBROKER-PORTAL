const express = require("express");
const router = express.Router();
const {
  getAllRegions,
  getCountryByName,
} = require("../controllers/regionController");

router.get("/region", getAllRegions);
router.get("/country/:name", getCountryByName); 

module.exports = router;
