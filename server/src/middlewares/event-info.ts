import { NextFunction, Request, Response } from "express";
import { logger } from "../utils";

export const eventInfoMiddleware = (req: Request, res: Response, next: NextFunction) => {

	const { body, query, headers, method } = req;

	logger.info({
		method,
		body,
		query,
		headers
	}, 'EVENT INFO');

	next();
}
