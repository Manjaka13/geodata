const Express = require("express");
const cors = require("cors");
const database = require("./interface/database.js");
const mainroute = require("./routes/mainroute.js");
const { PORT, ROUTES } = require("./lib/const.js");

/**
 * Main entry
 */

// Setup server
const app = Express();

// On halt
process.on("SIGINT", function () {
  database
    .close()
    .then(() => console.log("Service successfully closed"))
    .catch((err) => console.error("Unable to close database"))
    .finally(app.close);
});

// Apply middlewares
app.use(cors());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

// Main path displays docSetup main route
app.use(mainroute.path, mainroute.router);

// Setup routes
ROUTES.forEach((route) => {
  app.use(route.path, route.router);
});

// 404 handler
app.use((req, res) => {
  res.status(404).send(`
    <p style='color: red'>
      404 error - Page or ressource not found, verify the URL
    </p>
  `);
});

// Connects to database
database
  .connect()
  .then(() => {
    // Awaiting for incoming request
    app.listen(PORT, () => {
      console.log(`Geonames running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));
