const router = require("express").Router();
const { ROUTES } = require("../lib/const.js");
const { generateDoc } = require("../lib/utils.js");

/**
 * Main route displays doc
 */

router.get("/", (req, res) => {
	try {
		const doc = generateDoc(ROUTES);
		res.status(200).json(doc);
	} catch {
		res.status(500).json("An error occured on the server");
	}
});

module.exports = { path: "", router };
