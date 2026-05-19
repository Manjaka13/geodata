/**
 * Utility functions
 */

const utils = {
  // Generate documentation from routes
  generateDoc(routes) {
    const doc = {};
    routes.forEach((route) => {
      doc[route.path] = [];
      route.router.stack.forEach((p) => {
        doc[route.path].push(p.route.path)
      })
    });
    return doc;
  },
};

module.exports = utils;
