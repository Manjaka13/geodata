import dotenv from "dotenv";
import cities from "@routes/cities.js";
import countries from "@routes/countries.js";
import states from "@routes/states.js";

import type { AppRoute } from "@lib/types.js";

/**
 * Constants
 */

if (process.env?.NODE_ENV !== "production")
  dotenv.config();

export const PORT: Number | String = process.env?.PORT || 80;
export const ROUTES: AppRoute[] = [cities, countries, states];
