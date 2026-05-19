import { Router } from "express";
import { ROUTES } from "../lib/const.js";
import { generateDoc } from "../lib/utils.js";

/**
 * Main route displays doc
 */

const router = Router();

router.get("/", (req, res) => {
	try {
		const doc = generateDoc(ROUTES);
		res.status(200).json(doc);
	} catch {
		res.status(500).json("An error occured on the server");
	}
});

export default { path: "/", router };
