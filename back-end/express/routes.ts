import { requestLogger } from "./middlewares";
import { Request, Response, RequestHandler as Middleware } from 'express';
import { memoryDB } from "../DB/memoryDB";

type Method =
	| 'get'
	| 'head'
	| 'post'
	| 'put'
	| 'delete'
	| 'connect'
	| 'options'
	| 'trace'
	| 'patch';

export interface Route {
	method: Method;
	path: string;
	middleware: Middleware[];
	handler: (req: Request, res: Response) => any;
};


export const routes: Route[] = [
    {
		method: 'get',
		path: '/meeting',
		middleware: [requestLogger],
		handler: (req, res) => {
      		const { meetingID, user} = req.body;
			console.log(
				req.body,
				meetingID, user
			)
			if (memoryDB.has(meetingID)) {
				const meeting = memoryDB.get(meetingID)
				res.status(200).send(meeting);
			} else {
				res.status(404).send();
			}
		},
    }
];