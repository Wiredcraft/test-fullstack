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

	it.skip("should receive error when no access token if found", async () => {
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

	it.skip("should receive error when no email is found", async () => {
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

	it.skip("should receive error when no valid email is found", async () => {
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

})