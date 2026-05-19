const router = require("express").Router();
const database = require("../interface/database.js");

/**
 * City routes
 * All cities: /city/all
 */

// Get list of all cities
router.get("/all", (req, res) => {
  database
    .getAllCities()
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = { path: "/city", router };
