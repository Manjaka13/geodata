import type { AppRoute, Country } from "@lib/types.js";

/**
 * Utility functions
 */

// Generate documentation from routes
export const generateDoc = (routes: AppRoute[]) => {
  const doc: Record<string, string[]> = {};

  routes.forEach((route) => {
    const path = String(route.path);

    doc[path] = [];

    route.router.stack.forEach((p) => {
      if (doc[path])
        doc[path].push(typeof p?.route?.path === "string" ? String(p.route.path) : "***unknown***");
    });
  });

  return doc;
};
