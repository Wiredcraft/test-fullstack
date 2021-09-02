import { config } from 'dotenv';
config({ path: './.env.test' });

import axios from "axios";
import { getAuthUserFunction, gitHubCallback } from "../controllers/auth/github-auth";
import ApplicationManager from "../app";
import request from "supertest";
import { HttpMethod, ICustomRoute } from "../interfaces";
import { mockLogin, mockLoginErrorAuth, mockLoginErrorGetEmail } from "./mock";

const mockRoutesConfig: ICustomRoute[] = [{
  path: '/github/callback',
  method: HttpMethod.GET,
  handler: gitHubCallback
}];

const dbConn = () => console.log('Connected to DB MOCK');

const appManager = new ApplicationManager({ routesConfig: mockRoutesConfig, dbConn });
const server = appManager.getServer();

describe("Github Auth Service", () => {
  it("should return valid email", async () => {
    mockLogin();
    const mockReq: any = { query: { token: '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' } };
    const response = await getAuthUserFunction(mockReq);
    expect(response.email).toBe('selected@selected.com');
  })

  it("should receive error when access token request goes wrong", async () => {
    mockLoginErrorAuth();

    const response = await request(server).get('/github/callback');
    const { statusCode, message } = response.body;
    expect(statusCode).toBe(400);
    expect(message).toBe('Error trying to get Github Access Token');
  })

  it("should receive error when login request goes wrong", async () => {
    mockLoginErrorGetEmail();

    const response = await request(server).get('/github/callback');
    const { statusCode, message } = response.body;
    expect(statusCode).toBe(400);
    expect(message).toBe('Error trying to get Github Login');
  })

  it("should receive error when no valid login is found", async () => {
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
    expect(message).toBe('Error trying to find valid Github Login');

  })
})
