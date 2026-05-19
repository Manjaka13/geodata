import { Router } from "express";
import database from "../interface/database.js";

/**
 * States routes
 * All states: /states/all
 */

const router = Router();

// Get list of all states
router.get("/all", (req, res) => {
  database
    .getAllStates()
    .then((states) => {
      res.status(200).json(states);
    })
    .catch((err) => res.status(500).json(err));
});

export default { path: "/states", router };
