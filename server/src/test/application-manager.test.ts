import { config } from 'dotenv';
config({ path: './.env.test' });

import request from "supertest";
import ApplicationManager from "../app";
import { HttpMethod, ICustomRoute } from "../interfaces";

describe('ApplicationManager', () => {
	it('should successfully retrieve API health', async () => {
		const mockRoutesConfig: ICustomRoute[] = [{
			path: '/health',
			method: HttpMethod.GET,
			handler: (req, res) => res.json({ statusCode: 200, message: 'API running fine like wine' })
		}];

		const dbConn = () => console.log('Connected to DB MOCK');

		const appManager = new ApplicationManager({ routesConfig: mockRoutesConfig, dbConn });
		const server = appManager.getServer();

		const { body: { statusCode, message } } = await request(server).get('/health');

		expect(statusCode).toBe(200);
		expect(message).toBe('API running fine like wine');
	})

	it('should successfully retrieve API health -- more than one route', async () => {
		const mockRoutesConfig: ICustomRoute[] = [
			{
				path: '/health',
				method: HttpMethod.GET,
				handler: (req, res) => res.json({ statusCode: 200, message: 'API running fine like wine' })
			},
			{
				path: '/health2',
				method: HttpMethod.GET,
				handler: (req, res) => res.json({ statusCode: 200, message: 'API running fine like wine' })
			},
			{
				path: '/health3',
				method: HttpMethod.GET,
				handler: (req, res) => res.json({ statusCode: 200, message: 'API running fine like wine' })
			}
		];

		const dbConn = () => console.log('Connected to DB MOCK');

		const appManager = new ApplicationManager({ routesConfig: mockRoutesConfig, dbConn });
		const server = appManager.getServer();

		const { body: { statusCode, message } } = await request(server).get('/health');

		expect(statusCode).toBe(200);
		expect(message).toBe('API running fine like wine');

		const { body: { statusCode: status2, message: message2 } } = await request(server).get('/health2');

		expect(status2).toBe(200);
		expect(message2).toBe('API running fine like wine');

		const { body: { statusCode: status3, message: message3 } } = await request(server).get('/health3');

		expect(status3).toBe(200);
		expect(message3).toBe('API running fine like wine');
	})

	it('should receive udefined when trying to check API health -- no routes', async () => {
		const mockRoutesConfig: ICustomRoute[] = [];

		const dbConn = () => console.log('Connected to DB MOCK');

		const appManager = new ApplicationManager({ routesConfig: mockRoutesConfig, dbConn });
		const server = appManager.getServer();

		const { body: { statusCode } } = await request(server).get('/health');

		expect(statusCode).toBe(undefined);
	})
})
