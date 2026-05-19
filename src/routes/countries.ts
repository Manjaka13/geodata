import { Router } from "express";
import database from "@interface/database.js";
import type { AppRoute } from "@lib/types.js";

/**
 * Country routes
 * All countries: /country/all
 * A country: /country/name
 */

const router = Router();

// Gets all countries
router.get("/all", (_, res) => {
  database
    .getAllCountries()
    .then((countries) => {
      res.status(200).json(countries);
    })
    .catch((err: Error) => res.status(500).json(err));
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
    .catch((err: Error) => res.status(500).json(err));
});

const route: AppRoute = { path: "/country", router };

export default route;
