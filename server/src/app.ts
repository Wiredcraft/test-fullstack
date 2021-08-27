import express, { Application } from "express";
import { IApplicationConfig } from "./interfaces";
import RouterManager from "./router/router-manager";
import { errorMiddleware, eventInfoMiddleware } from "./middlewares";

class ApplicationManager {
	private app: Application;
	private applicationConfig: IApplicationConfig;

	constructor(applicationConfig: IApplicationConfig) {
		this.app = express();
		this.applicationConfig = applicationConfig;
		this.setupApplication();
	}

	private setupApplication() {
		const { routesConfig } = this.applicationConfig;

		this.app.use(eventInfoMiddleware);
		RouterManager.setRoutesInApplication(routesConfig, this.app);
		this.app.use(errorMiddleware);
	}

	public getServer(): Application {
		return this.app;
	}

}

export default ApplicationManager;
