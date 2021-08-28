import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ErrorHandler } from "../utils";
import { checkToken } from "../utils/token";
export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const accessToken = req.headers['authorization'] || '';
	if (accessToken) {
		try {
			const accessData = checkToken(accessToken);
			req.headers['user'] = (accessData as JwtPayload).email;

		} catch (err) {
			throw new ErrorHandler({
				functionName: "authorizationMiddleware",
				message: "Access Token is not valid",
				statusCode: 403,
				errDev: err
			});
		}
	} else {
		throw new ErrorHandler({
			functionName: "authorizationMiddleware",
			message: "No accessToken sent in the request",
			statusCode: 401
		});
	}
	next();
}
