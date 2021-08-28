import { Response, Request, NextFunction } from "express";
import { logger } from ".";

type ControllerFunction = (req: Request, res: Response, next: NextFunction) => void;

/**
 * Encapsulate controller, log envent and treats any thrown error
 */
export const getController = (functionToExecute: ControllerFunction) => composeGenerator(functionToExecute)

const composeGenerator = (controller: ControllerFunction) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { body, query, headers, method } = req;

		logger.info({
			method,
			body,
			query,
			headers
		}, 'EVENT INFO');


		const response = await controller(req, res, next);
		res.json(response);
	} catch (err) {
		next(err)
	}
}
