import { HttpMethod } from "./server-common";
import { NextFunction, Request, Response } from "express";

export interface ICustomRoute {
	path: string;
	method: HttpMethod;
	handler(req: Request, res: Response, next: NextFunction): void;
}
