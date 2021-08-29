import { config } from 'dotenv';
config({ path: './.env.test' });

import request from "supertest";
import ApplicationManager from "../app";
import { HttpMethod, ICustomRoute } from "../interfaces";
import {
	createTalk,
	getTalks,
	putVoteCount,
	getAuthenticatedUserEmail
} from "../controllers";

import mongoose from "mongoose";

import { authorizationMiddleware } from "../middlewares";

import { MongoMemoryServer } from 'mongodb-memory-server';
import { TalkModel } from '../models';
import { mockLogin } from './mock';


const talkRoutes: ICustomRoute[] = [
	{
		path: '/talk',
		method: HttpMethod.POST,
		handler: createTalk,
		customMiddleware: authorizationMiddleware
	},
	{
		path: '/talk',
		method: HttpMethod.GET,
		handler: getTalks,
	},
	{
		path: '/talk/vote',
		method: HttpMethod.PUT,
		handler: putVoteCount,
		customMiddleware: authorizationMiddleware
	},
	{
		path: '/github/callback',
		method: HttpMethod.GET,
		handler: getAuthenticatedUserEmail
	}
]

describe('Talk endpoints', () => {
	beforeAll(async () => {
		const mongoServer = await MongoMemoryServer.create({ instance: { dbName: 'talk' } });
		await mongoose.connect(mongoServer.getUri());


		//Mocking Database
		const talks = [
			new TalkModel({ title: 'Test One', author: "tester", description: 'This is Test One' }),
			new TalkModel({ title: 'Test Two', author: "tester", description: 'This is Test Two' }),
			new TalkModel({ title: 'Test Three', author: "tester", description: 'This is Test Three' }),
			new TalkModel({ title: 'Test Four', author: "tester", description: 'This is Test Three', votes: ["test@gmail.com"] }),
			new TalkModel({ title: 'Test Five', author: "tester", description: 'This is Test Three', votes: ["test@gmail.com", "test2@gmail.com"] }),
			new TalkModel({ title: 'Test Six', author: "tester", description: 'This is Test Three', votes: [] })
		];

		await TalkModel.insertMany(talks);
	})

	const getValidInternalTokenAndServer = async () => {
		const dbConn = () => console.log('Connected to DB MOCK');
		const appManager = new ApplicationManager({ routesConfig: talkRoutes, dbConn });
		const server = appManager.getServer();

		mockLogin();
		//Getting access token
		const response = await request(server).get('/github/callback');
		const { internalToken } = response.body;

		return {
			internalToken,
			server
		}
	}

	it('should get talks ordered by greater number of votes', async () => {
		const { server } = await getValidInternalTokenAndServer();

		const { body: { statusCode, message, talks } } = await request(server).get('/talk');

		expect(talks[0].title).toBe('Test Five');
		expect(statusCode).toBe(200);
		expect(message).toBe('Talks ordered by votes count');
	})

	it('should update talk vote count -- ADD', async () => {
		const { server, internalToken } = await getValidInternalTokenAndServer();

		const newTalk = new TalkModel({
			title: 'Test for update',
			description: 'This is the Test for update',
			author: "selected@selected.com"
		});

		const { _id } = await newTalk.save();

		const { body: { statusCode, message } } = await request(server)
			.put('/talk/vote')
			.send({ talkId: _id, operation: 'ADD' })
			.set('authorization', internalToken);

		const updatedTalk = await TalkModel.findOne({ _id });

		expect(updatedTalk?.votes.length).toBe(1);
		expect(updatedTalk?.votes[0]).toBe("selected@selected.com");
		expect(statusCode).toBe(200);
		expect(message).toBe('Vote Counted');
	})

	it('should update talk vote count -- REMOVE', async () => {
		const { server, internalToken } = await getValidInternalTokenAndServer();

		const newTalk = new TalkModel({
			title: 'Test for update',
			description: 'This is the Test for update',
			author: "selected@selected.com",
			votes: ["selected@selected.com", "test@test.com"]
		});

		const { _id } = await newTalk.save();

		const { body: { statusCode, message } } = await request(server)
			.put('/talk/vote')
			.send({ talkId: _id, operation: 'REMOVE' })
			.set('authorization', internalToken);

		const updatedTalk = await TalkModel.findOne({ _id });

		expect(updatedTalk?.votes.length).toBe(1);
		expect(updatedTalk?.votes[0]).toBe("test@test.com");
		expect(statusCode).toBe(200);
		expect(message).toBe('Vote Counted');
	})

	it('should create a talk', async () => {
		const { server, internalToken } = await getValidInternalTokenAndServer();

		const newTalk = {
			title: 'Test for update',
			description: 'This is the Test for update',
			votes: ["selected@selected.com", "test@test.com"]
		};

		const { body: { statusCode, message, talkId } } = await request(server)
			.post('/talk')
			.send({ ...newTalk })
			.set('authorization', internalToken);

		expect(talkId).toBeTruthy();
		expect(statusCode).toBe(201);
		expect(message).toBe('Talk created');
	})

	it('should return error when trying to update wihtout passing TalkId', async () => {
		const { server, internalToken } = await getValidInternalTokenAndServer();

		const { body: { statusCode, message } } = await request(server)
			.put('/talk/vote')
			.send({ operation: 'REMOVE' })
			.set('authorization', internalToken);

		expect(statusCode).toBe(400);
		expect(message).toBe('Provide TalkId field');
	})
})