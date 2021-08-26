import { ICustomRoute } from "../interfaces";
import { HttpMethod } from "../interfaces";

const routesConfig: ICustomRoute[] = [
	{
		path: '/health',
		method: HttpMethod.GET,
		handler: (req, res) => res.json({ status: 200, message: 'API running fine like wine' })
	}
]

export default routesConfig;
