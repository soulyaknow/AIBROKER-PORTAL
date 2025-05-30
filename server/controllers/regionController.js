const axios = require('axios');
const regionApi = process.env.REGION_API || 'https://restcountries.com/v3.1/all';

let cachedCountries = [];

const fetchCountries = async () => {
  if (cachedCountries.length === 0) {
    const response = await axios.get(regionApi);
    cachedCountries = response.data;
  }
  return cachedCountries;
};

exports.getAllRegions = async (req, res) => {
  try {
    const countries = await fetchCountries();

    const countryNames = countries
      .map((country) => country.name.common)
      .filter(Boolean);

    res.status(200).json(countryNames);
  } catch (err) {
    console.error("Error fetching countries:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCountryByName = async (req, res) => {
  try {
    const { name } = req.params;
    const countries = await fetchCountries();
    const formattedDate = new Date().toISOString().split("T")[0];

    const filtered = countries.filter(
      (country) => country.name?.common.toLowerCase() === name.toLowerCase()
    );

    if (filtered.length === 0) {
      return res.status(404).json({ error: "Country not found" });
    }

    const country = filtered[0];

    res.status(200).json({
  country: country.name?.common,
  timezones: country.timezones,
  region: country.region,
  date: formattedDate,
});
  } catch (err) {
    console.error("Error fetching country data:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

