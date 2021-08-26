import { HttpMethod } from "./server-common";
import { Request, Response } from "express";

export interface ICustomRoute {
	path: string;
	method: HttpMethod;
	handler(req: Request, res: Response): void;
}
