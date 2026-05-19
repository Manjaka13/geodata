import type { Router } from "express";
import type { PathParams } from "express-serve-static-core";

/**
 * Types and interfaces
 */

type RouterType = ReturnType<typeof Router>;

export interface AppRoute {
  path: PathParams,
  router: RouterType
}

export interface Country {
  id: Number | String,
  sortname?: String,
  name: String,
  phonecode?: String | Number
}

export interface State {
  id: Number | String,
  name: String,
  country_id?: Number | String
}

export interface City {
  id: Number | String,
  name: String,
  state_id?: Number | String
}
