import { Application, Router } from "express";
import { ICustomRoute } from "../interfaces";
import { logger } from "../utils";

const setRoutesInApplication = (routesConfig: ICustomRoute[], app: Application) => {
	routesConfig.forEach((config) => {
		const route = createRouteFromConfig(config);
		app.use(route)

		const { method, path } = config;

		logger.info(`Endpoint in use: ${method}-${path}`);
	});
}

const createRouteFromConfig = (routeConfig: ICustomRoute): Router => {
	const router = Router();

	const { handler, method, path, customMiddleware } = routeConfig;

	customMiddleware ? router[method](path, customMiddleware, handler) : router[method](path, handler);
	return router;
}

export default {
	setRoutesInApplication
}
