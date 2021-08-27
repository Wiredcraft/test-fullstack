import { NextFunction, Request, Response } from "express";
import { ICustomError } from "../interfaces";

export const errorMiddleware = (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
	const { message = 'Internal Server Error', statusCode = 500 } = err;

	res.status(statusCode).json({
		status: "error",
		statusCode,
		message
	});
}