const { supabase } = require("../middleware/supabaseClient");
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

exports.saveRegion = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ error: "Invalid token format" });

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user)
      return res.status(403).json({ error: "Invalid token" });

    const user = data.user;

    // Payload from frontend
    const { country, region, date, timezones } = req.body;

    if (!country || !region || !date || !timezones?.length) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Upsert the region data for the current user
    const { error: upsertError } = await supabase
      .from("Region")
      .upsert(
        {
          user_id: user.id,
          region_name: region,
          date_format: date,
          time_zone: timezones[0], // or join if multiple
          country: country,
        },
      );

    if (upsertError) {
      console.error("Upsert error:", upsertError.message);
      return res.status(500).json({ error: "Failed to save region preferences" });
    }

    res.status(200).json({ success: true, message: "Region preferences saved" });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Server error saving region preferences" });
  }
};

exports.getRegion = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ error: "Invalid token format" });

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user)
      return res.status(403).json({ error: "Invalid token" });

    const user = data.user;

    const { data: regionData, error: regionError } = await supabase
      .from("Region")
      .select("country, region_name, date_format, time_zone")
      .eq("user_id", user.id)
      .maybeSingle();

    if (regionError) {
      console.error("Error fetching region:", regionError.message);
      return res.status(500).json({ error: "Failed to fetch region preferences" });
    }

    res.status(200).json(regionData);
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Server error fetching region preferences" });
  }
};



