import { Application, Router } from "express";
import { ICustomRoute } from "../interfaces";

class RouterManager {
	static setRoutesInApplication(routesConfig: ICustomRoute[], app: Application) {
		routesConfig.forEach((config) => {
			const route = this.createRouteFromConfig(config);
			app.use(route)
		});
	}

	private static createRouteFromConfig(routeConfig: ICustomRoute): Router {
		const router = Router();

		const { handler, method, path } = routeConfig;

		router[method](path, handler);
		return router;
	}
}

export default RouterManager;
