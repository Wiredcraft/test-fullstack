import { NextFunction, Request, Response } from "express";
import { ICustomError } from "../interfaces";
import { logger } from "../utils";

export const errorMiddleware = (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
	let { message, statusCode = 500 } = err;

	logger.error({ err }, 'ERROR HANDLER');
	message = statusCode === 500 ? 'Internal Server Error' : message;

	res.status(statusCode).json({
		status: "error",
		statusCode,
		message
	});
}