const router = require("express").Router();
const database = require("../interface/database.js");

/**
 * Country routes
 * All countries: /country/all
 * A country: /country/name
 */

// Gets all countries
router.get("/all", (req, res) => {
  database
    .getAllCountries()
    .then((countries) => {
      res.status(200).json(countries);
    })
    .catch((err) => res.status(500).json(err));
});

// Gets country by name
router.get("/:name", (req, res) => {
  const { name } = req.params;
  database
    .getCountry(name)
    .then((country) => {
      if (!country) res.status(404).json(`Country ${name} was not found`);
      else res.status(200).json(country);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = { path: "/country", router };
