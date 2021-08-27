import axios from "axios";
import { getAuthenticatedUserEmail } from "../services/github-auth";
import ApplicationManager from "../app";
import request from "supertest";
import { HttpMethod, ICustomRoute } from "../interfaces";

const mockRoutesConfig: ICustomRoute[] = [{
	path: '/github/callback',
	method: HttpMethod.GET,
	handler: getAuthenticatedUserEmail
}];

const appManager = new ApplicationManager({ routesConfig: mockRoutesConfig });
const server = appManager.getServer();

describe("Github Auth Service", () => {
	it("should return valid email", async () => {
		jest.spyOn(axios, 'post').mockResolvedValue({
			data: {
				access_token: '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',
				token_type: 'bearer',
				scope: 'user:email'
			}
		});

		jest.spyOn(axios, 'get').mockResolvedValue({
			data: [{
				email: 'selected@selected.com',
				primary: true,
				verified: true,
				visibility: 'private'
			},
			{
				email: 'test.noreply.github.com',
				primary: false,
				verified: true,
				visibility: null
			},
			{
				email: 'test@test.br',
				primary: false,
				verified: true,
				visibility: null
			}]
		});


		const response = await request(server).get('/github/callback');
		expect(response.text).toBe('selected@selected.com');
	})

	it("should receive error when access token request goes wrong", async () => {
		jest.spyOn(axios, 'post').mockRejectedValueOnce('ERROR_TEST');

		jest.spyOn(axios, 'get').mockResolvedValue({
			data: [{
				email: 'selected@selected.com',
				primary: true,
				verified: true,
				visibility: 'private'
			},
			{
				email: 'test.noreply.github.com',
				primary: false,
				verified: true,
				visibility: null
			},
			{
				email: 'test@test.br',
				primary: false,
				verified: true,
				visibility: null
			}]
		});


		const response = await request(server).get('/github/callback');
		const { statusCode, message } = response.body;
		expect(statusCode).toBe(400);
		expect(message).toBe('Error trying to get Github Access Token');
	})

	it("should receive error when email request goes wrong", async () => {
		jest.spyOn(axios, 'post').mockResolvedValue({
			data: {
				access_token: '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',
				token_type: 'bearer',
				scope: 'user:email'
			}
		});

		jest.spyOn(axios, 'get').mockRejectedValueOnce('ERROR_TEST')

		const response = await request(server).get('/github/callback');
		const { statusCode, message } = response.body;
		expect(statusCode).toBe(400);
		expect(message).toBe('Error trying to get Github Email');
	})

	it("should receive error when no valid email is found", async () => {
		jest.spyOn(axios, 'post').mockResolvedValue({
			data: {
				access_token: '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',
				token_type: 'bearer',
				scope: 'user:email'
			}
		});

		jest.spyOn(axios, 'get').mockResolvedValue({
			data: []
		});

		const response = await request(server).get('/github/callback');
		const { statusCode, message } = response.body;
		expect(statusCode).toBe(400);
		expect(message).toBe('Error trying to find valid Github Email');

	})

})