import { config } from 'dotenv';
config({ path: './.env.test' });

import { getAuthenticatedUserEmail } from "../services/github-auth";
import ApplicationManager from "../app";
import request from "supertest";
import { HttpMethod, ICustomRoute } from "../interfaces";
import { authorizationMiddleware } from "../middlewares";
import { mockLogin } from "./mock";

const mockRoutesConfig: ICustomRoute[] = [{
	path: '/github/callback',
	method: HttpMethod.GET,
	handler: getAuthenticatedUserEmail
},
{
	path: '/protected/route',
	method: HttpMethod.GET,
	handler: (req, res) => res.json({ status: 200, message: 'You are in!', user: req.custom }),
	customMiddleware: authorizationMiddleware
}
];

const appManager = new ApplicationManager({ routesConfig: mockRoutesConfig });
const server = appManager.getServer();


describe("JWT Authorization", () => {
	it("should authorize user to access protected route", async () => {
		mockLogin();

		const response = await request(server).get('/github/callback');
		const { internalToken } = response.body;

		const responseFromProtectedRoute = await request(server)
			.get('/protected/route')
			.set('authorization', internalToken);

		const { message, status, user } = responseFromProtectedRoute.body;

		expect(status).toBe(200);
		expect(message).toBe('You are in!');
		expect(user).toBe("selected@selected.com");
	})

	it("should receive error when sending no authorization", async () => {
		const responseFromProtectedRoute = await request(server)
			.get('/protected/route')

		const { status, statusCode, message } = responseFromProtectedRoute.body;

		expect(status).toBe("error");
		expect(statusCode).toBe(401);
		expect(message).toBe("No accessToken sent in the request");

	})

	it("should receive error when sending not valid authorization", async () => {
		mockLogin();

		const response = await request(server).get('/github/callback');
		const { internalToken } = response.body;

		const wrongToken = 'err' + internalToken.slice(3);

		const responseFromProtectedRoute = await request(server)
			.get('/protected/route')
			.set('authorization', wrongToken);

		const { message, statusCode, status } = responseFromProtectedRoute.body;

		expect(status).toBe("error");
		expect(statusCode).toBe(403);
		expect(message).toBe("Access Token is not valid");
	})
})