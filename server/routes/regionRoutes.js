const express = require("express");
const router = express.Router();
const {
  getAllRegions,
  getCountryByName,
  saveRegion,
  getRegion,
} = require("../controllers/regionController");

router.get("/region", getAllRegions);
router.get("/country/:name", getCountryByName);
router.get("/getRegion", getRegion);

router.post("/saveRegion", saveRegion);

module.exports = router;
