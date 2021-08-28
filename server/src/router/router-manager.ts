import { Application, Router } from "express";
import { ICustomRoute } from "../interfaces";
import { logger } from "../utils";

class RouterManager {
	static setRoutesInApplication(routesConfig: ICustomRoute[], app: Application) {
		routesConfig.forEach((config) => {
			const route = this.createRouteFromConfig(config);
			app.use(route)

			const { method, path } = config;

			logger.info(`Endpoint in use: ${method}-${path}`);
		});
	}

	private static createRouteFromConfig(routeConfig: ICustomRoute): Router {
		const router = Router();

		const { handler, method, path, customMiddleware } = routeConfig;

		customMiddleware ? router[method](path, customMiddleware, handler) : router[method](path, handler);
		return router;
	}
}

export default RouterManager;
