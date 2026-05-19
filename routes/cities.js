import { Router } from "express";
import database from "../interface/database.js";

/**
 * City routes
 * All cities: /city/all
 */

const router = Router();

// Get list of all cities
router.get("/all", (req, res) => {
  database
    .getAllCities()
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((err) => res.status(500).json(err));
});

export default { path: "/city", router };
