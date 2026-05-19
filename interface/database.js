const sqlite3 = require("sqlite3").verbose();

/**
 * SQLite3 communication interface
 */

const database = {
  connect() {
    return new Promise((resolve, reject) => {
      db = new sqlite3.Database("./db.sqlite", sqlite3.OPEN_READONLY, function (
        err,
      ) {
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
      db.all(`SELECT * from countries`, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  getCountry(name) {
    return new Promise((resolve, reject) => {
      if (name) {
        const request = `SELECT * from countries WHERE name = ? COLLATE NOCASE`;
        db.get(request, [name], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      } else reject("No country name provided");
    });
  },

  getAllStates() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * from states`, [], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
};

module.exports = database;
