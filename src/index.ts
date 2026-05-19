import Express from "express";
import cors from "cors";
import database from "@interface/database.js";
import mainroute from "@routes/mainroute.js";
import { PORT, ROUTES } from "@lib/const.js";

import type { AppRoute } from "@lib/types.js";

import type { Server } from "node:http";

/**
 * Main entry
 */

// Setup server
const app = Express();

// Start server reference
let server: Server;

// On halt
process.on("SIGINT", () => {
  database
    .close()
    .then(() => console.log("Service successfully closed"))
    .catch(() => console.error("Unable to close database"))
    .finally(() => {
      if (server) {
        server.close();
      }
    });
});

// Apply middlewares
app.use(cors());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

// Main path displays docSetup main route
app.use(mainroute.path, mainroute.router);

// Setup routes
ROUTES.forEach((route: AppRoute) => {
  app.use(route.path, route.router);
});

// 404 handler
app.use((_, res) => {
  res.status(404).send(`
    <p style='color: red'>
      404 error - Page or resource not found, verify the URL
    </p>
  `);
});

// Connects to database
database
  .connect()
  .then(() => {
    // Awaiting incoming requests
    server = app.listen(PORT, () => {
      console.log(`Geonames running on port http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => console.error(err));