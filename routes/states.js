const router = require("express").Router();
const database = require("../interface/database.js");

/**
 * States routes
 * All states: /states/all
 */

// Get list of all states
router.get("/all", (req, res) => {
  database
    .getAllStates()
    .then((states) => {
      res.status(200).json(states);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = { path: "/states", router };
