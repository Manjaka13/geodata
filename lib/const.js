import dotenv from "dotenv";
import cities from "../routes/cities.js";
import countries from "../routes/countries.js";
import states from "../routes/states.js";

/**
 * Constants
 */

if (process.env?.NODE_ENV !== "production")
  dotenv.config();

export const PORT = process.env?.PORT || 80;
export const ROUTES = [ cities, countries, states ];
