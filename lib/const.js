if (process.env?.NODE_ENV !== "production")
  require("dotenv").config();

const cities = require("../routes/cities.js");
const countries = require("../routes/countries.js");
const states = require("../routes/states.js");

/**
 * Constants
 */

const consts = {
  // Server port
  PORT: process.env?.PORT || 80,

  // App routes
  ROUTES: [ cities, countries, states ],
};

module.exports = consts;
