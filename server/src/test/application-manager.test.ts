import request from "supertest";
import ApplicationManager from "../app";
import { HttpMethod, ICustomRoute } from "../interfaces";

const mockRoutesConfig: ICustomRoute[] = [{
	path: '/health',
	method: HttpMethod.GET,
	handler: (req, res) => res.json({ status: 200, message: 'API running fine like wine' })
}]

const appManager = new ApplicationManager({ routesConfig: mockRoutesConfig });
const server = appManager.getServer();

describe('ApplicationManager', () => {
	it('should successfully retrieve API health', async () => {
		const { body: { status, message } } = await request(server).get('/health');

		expect(status).toBe(200);
		expect(message).toBe('API running fine like wine');
	})
})
