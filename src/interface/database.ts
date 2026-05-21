import sqlite3pkg from "sqlite3";

import type { Database } from "sqlite3";
import type { Country, City, State } from "@lib/types.js";

const sqlite3 = sqlite3pkg.verbose();
let db: Database;

/**
 * SQLite3 communication interface
 */

const database = {
  connect(): Promise<null> {
    return new Promise((resolve, reject) => {
      db = new sqlite3.Database("./db.sqlite", sqlite3.OPEN_READONLY, (err) => {
        if (err) reject(err);
        else resolve(null);
      });
    });
  },

  close(): Promise<null> {
    return new Promise((resolve, reject) => {
      db.close((err) => {
        if (err) reject(err);
        else resolve(null);
      });
    });
  },

  getAllCities(): Promise<City[]> {
    return new Promise((resolve, reject) => {
      const request = "SELECT * from cities";

      db.all(request, (err, row) => {
        if (err) reject(err);
        else resolve(row as City[]);
      });
    });
  },

  getCity(name: String): Promise<City> {
    return new Promise((resolve, reject) => {
      if (!name)
        reject("No city name provided");

      const request = `
        SELECT
          cities.id AS id,
          cities.name AS name,
          states.name AS state,
          countries.name AS country
        FROM cities
        JOIN states ON cities.state_id = states.id
        JOIN countries ON states.country_id = countries.id
        WHERE cities.name = ? COLLATE NOCASE;
      `;

      db.get(request, [name], (err, row) => {
        if (err) reject(err);
        else resolve(row as City);
      });
    });
  },

  getAllCountries(): Promise<Country[]> {
    return new Promise((resolve, reject) => {
      const request = `
        SELECT
          c.*,
          COUNT(DISTINCT s.id) AS states,
          COUNT(ci.id) AS cities
        FROM countries c
        LEFT JOIN states s
          ON s.country_id = c.id
        LEFT JOIN cities ci
          ON ci.state_id = s.id
        GROUP BY c.id;
      `;

      db.all(request, (err, row) => {
        if (err) reject(err);
        else resolve(row as Country[]);
      });
    });
  },

  getCountry(name: String): Promise<Country> {
    return new Promise((resolve, reject) => {
      if (!name)
        reject("No country name provided");

      // const request = "SELECT * from countries WHERE name = ? COLLATE NOCASE";
      const request = `
        SELECT
          c.*,
          COUNT(DISTINCT s.id) AS states,
          COUNT(ci.id) AS cities
        FROM countries c
        LEFT JOIN states s ON s.country_id = c.id
        LEFT JOIN cities ci ON ci.state_id = s.id
        WHERE c.name = ? COLLATE NOCASE
        GROUP BY c.id
      `;

      db.get(request, [name], (err, row) => {
        if (err) reject(err);
        else resolve(row as Country);
      });
    });
  },

  getAllStates(): Promise<State[]> {
    return new Promise((resolve, reject) => {
      db.all("SELECT * from states", [], (err, row) => {
        if (err) reject(err);
        else resolve(row as State[]);
      });
    });
  },

  getState(name: String): Promise<State> {
    return new Promise((resolve, reject) => {
      if (!name)
        reject("No state name provided");

      const request = `
        SELECT
          states.id as id,
          states.name as name,
          countries.name as country
        FROM states
        JOIN countries ON states.country_id = countries.id
        WHERE states.name = ? COLLATE NOCASE
      `;

      db.get(request, [name], (err, row) => {
        if (err) reject(err);
        else resolve(row as State);
      });
    });
  },
};

export default database;
