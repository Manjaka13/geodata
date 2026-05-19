import sqlite3pkg from "sqlite3";

const sqlite3 = sqlite3pkg.verbose();
let db;

/**
 * SQLite3 communication interface
 */

const database = {
  connect() {
    return new Promise((resolve, reject) => {
      db = new sqlite3.Database("./db.sqlite", sqlite3.OPEN_READONLY, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },

  close() {
    return new Promise((resolve, reject) => {
      db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },

  getAllCities() {
    return new Promise((resolve, reject) => {
      const request = "SELECT * from cities";

      db.all(request, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  getAllCountries() {
    return new Promise((resolve, reject) => {
      const request = "SELECT * from countries";

      db.all(request, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  getCountry(name) {
    return new Promise((resolve, reject) => {
      if (!name) {
        reject("No country name provided");
        return;
      }

      const request = "SELECT * from countries WHERE name = ? COLLATE NOCASE";

      db.get(request, [name], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  getAllStates() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * from states", [], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
};

export default database;
