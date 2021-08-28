import { ICustomRoute } from "../interfaces";
import { HttpMethod } from "../interfaces";
import {
	getAuthenticatedUserEmail,
	createTalk
} from "../controllers";
import { authorizationMiddleware } from "../middlewares";

const talkRoutes: ICustomRoute[] = [
	{
		path: '/talk',
		method: HttpMethod.POST,
		handler: createTalk,
		customMiddleware: authorizationMiddleware
	},
]

const routesConfig: ICustomRoute[] = [
	{
		path: '/health',
		method: HttpMethod.GET,
		handler: (req, res) => res.json({ status: 200, message: 'API running fine like wine' }),
	},
	{
		path: '/github/callback',
		method: HttpMethod.GET,
		handler: getAuthenticatedUserEmail,
	},
	...talkRoutes
]

export default routesConfig;
