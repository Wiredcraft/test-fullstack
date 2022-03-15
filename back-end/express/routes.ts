import { requestLogger } from "./middlewares";
import { Request, Response, RequestHandler as Middleware } from 'express';
import { memoryDB } from "../DB/memoryDB";
import { Meeting, Talk } from "../types";

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

const meetingRoutes: Route[] = [
	{
		method: 'get',
		path: '/meeting/:meetingID',
		middleware: [requestLogger],
		handler: (req, res) => {
			const meetingID = req.params.meetingID;
			if (memoryDB.has(meetingID)) {
				const meeting = memoryDB.get(meetingID)
				res.status(200).send(meeting);
			} else {
				res.status(404).send({
					error: {
						path: req.path,
						status: 404,
						message: "meeting not found in database"
					}
				});
			}
		},
    },
	{
		method: 'post',
		path: '/meeting',
		middleware: [requestLogger],
		handler: (req, res) => {
			const {meetingID, user} = req.body;
			if (!memoryDB.has(meetingID)) {
				const newMeeting: Meeting = {
					meetingID,
					talks: [],
					orgnizer: [user],
					allUsers: [user]
				}
				memoryDB.put(meetingID, newMeeting)
				res.status(200).send(newMeeting);
			} else {
				res.status(400).send({
					error: {
						path: req.path,
						status: 400,
						message: `meetingID ${meetingID} has existed in DB`
					}
				});
			}
		}
	}
];

const talkRoutes: Route[] = [
	{
		method: 'post',
		path: '/talk/:meetingID',
		middleware: [requestLogger],
		handler: (req, res) => {
			const meetingID = req.params.meetingID;
			const {title, description, user} = req.body;

			const meeting: Meeting = memoryDB.get(meetingID);
			const newTalk: Talk = {
				talkID: (new Date()).getTime().toString(),
				title,
				description,
				polledUser: [user]
			}

			meeting.talks.push(newTalk);
			meeting.talks.sort((t1, t2) => t2.polledUser.length - t1.polledUser.length);

			memoryDB.put(meetingID, meeting);

			return res.status(200).send("talk created")
		}
	}
];

const otherRoutes: Route[] = [
	{
		method: 'put',
		path: '/poll/:meetingID',
		middleware: [requestLogger],
		handler: (req, res) => {
			const meetingID = req.params.meetingID;
			const {talkID, user} = req.body;

			const meeting: Meeting = memoryDB.get(meetingID);
			const talk = meeting.talks.find(t => t.talkID === talkID);

			let newPolledUser: string[] = talk!.polledUser.slice()
			newPolledUser.push(user);
			newPolledUser = Array.from(new Set(newPolledUser));
			talk!.polledUser = newPolledUser;

			memoryDB.put(meetingID, meeting);

			return res.status(200).send(meeting)
		}
	},
	{
		method: 'put',
		path: '/user/:meetingID',
		middleware: [requestLogger],
		handler: (req, res) => {
			console.log("user/:meetingID");
			const meetingID = req.params.meetingID;
			const {user} = req.body;
			const meeting: Meeting = memoryDB.get(meetingID);
			meeting.allUsers.push(user);

			memoryDB.put(meetingID, meeting);

			return res.status(200).send(meeting)
		}
	}
];

export const routes: Route[] = [
	...meetingRoutes,
	...talkRoutes,
	...otherRoutes
];