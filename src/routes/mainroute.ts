import { Router } from "express";
import { ROUTES } from "@lib/const.js";
import { generateDoc } from "@lib/utils.js";

import type { AppRoute } from "@lib/types.js";

/**
 * Main route displays doc
 */

const router = Router();

router.get("/", (_, res) => {
	try {
		const doc = generateDoc(ROUTES);
		res.status(200).json(doc);
	} catch(err) {
		console.error(err);
		res.status(500).json("An error occured on the server");
	}
});

const route: AppRoute = { path: "/", router }

export default route;
