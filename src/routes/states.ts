import { Router } from "express";
import database from "@interface/database.js";
import type { AppRoute } from "@lib/types.js";

/**
 * States routes
 * All states: /states/all
 */

const router = Router();

// Get list of all states
router.get("/all", (_, res) => {
  database
    .getAllStates()
    .then((states) => {
      res.status(200).json(states);
    })
    .catch((err) => res.status(500).json(err));
});

const route: AppRoute = { path: "/states", router };

export default route;
