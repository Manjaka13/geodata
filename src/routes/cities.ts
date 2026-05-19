import { Router } from "express";
import database from "@interface/database.js";
import type { AppRoute } from "@lib/types.ts";

/**
 * City routes
 * All cities: /city/all
 */

const router = Router();

// Get list of all cities
router.get("/all", (_, res) => {
  database
    .getAllCities()
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((err: Error) => res.status(500).json(err));
});

const route: AppRoute = { path: "/city", router };

export default route;
