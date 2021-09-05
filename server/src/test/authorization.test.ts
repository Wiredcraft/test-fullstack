import { config } from 'dotenv';
config({ path: './.env.test' });

import { getAuthUserFunction, gitHubCallback } from "../controllers/auth/github-auth";
import ApplicationManager from "../app";
import request from "supertest";
import { HttpMethod, ICustomRoute } from "../interfaces";
import { authorizationMiddleware } from "../middlewares";
import { mockLogin } from "./mock";

const mockRoutesConfig: ICustomRoute[] = [{
  path: '/github/callback',
  method: HttpMethod.GET,
  handler: gitHubCallback
},
{
  path: '/protected/route',
  method: HttpMethod.GET,
  handler: (req, res) => res.json({ status: 200, message: 'You are in!', user: req.headers["user"] }),
  customMiddleware: authorizationMiddleware
}
];

const dbConn = () => console.log('Connected to DB MOCK');

const appManager = new ApplicationManager({ routesConfig: mockRoutesConfig, dbConn });
const server = appManager.getServer();


describe("JWT Authorization", () => {
  it("should authorize user to access protected route", async () => {
    mockLogin();

    const mockReq: any = { query: { token: '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' } };
    const response = await getAuthUserFunction(mockReq);
    const { internalToken } = response;

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

    const mockReq: any = { query: { token: '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' } };
    const response = await getAuthUserFunction(mockReq);
    const { internalToken } = response;

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