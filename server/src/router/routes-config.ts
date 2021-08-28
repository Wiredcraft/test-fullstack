import { ICustomRoute } from "../interfaces";
import { HttpMethod } from "../interfaces";
import { getAuthenticatedUserEmail } from "../services";

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
]

export default routesConfig;
