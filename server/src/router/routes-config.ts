import { ICustomRoute } from "../interfaces";
import { HttpMethod } from "../interfaces";
import {
  gitHubCallback,
  createTalk,
  getTalks,
  putVoteCount,
  getUserEncryptedEmail
} from "../controllers";
import { authorizationMiddleware } from "../middlewares";

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
]

const authRoutes: ICustomRoute[] = [
  {
    path: '/github/callback',
    method: HttpMethod.GET,
    handler: gitHubCallback,
  },
  {
    path: '/github/user-data/',
    method: HttpMethod.GET,
    handler: getUserEncryptedEmail,
  },
]


const routesConfig: ICustomRoute[] = [
  {
    path: '/health',
    method: HttpMethod.GET,
    handler: (req, res) => res.json({ status: 200, message: 'API running fine like wine' }),
  },
  ...authRoutes,
  ...talkRoutes
]

export default routesConfig;
