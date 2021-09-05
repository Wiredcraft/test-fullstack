import express, { Application } from "express";
import { IApplicationConfig } from "./interfaces";
import RouterManager from "./router/router-manager";
import { errorMiddleware } from "./middlewares";
import cors from "cors";

class ApplicationManager {
	private app: Application;
	private applicationConfig: IApplicationConfig;

	constructor(applicationConfig: IApplicationConfig) {
		this.app = express();
		this.applicationConfig = applicationConfig;
		this.setupApplication();
	}

	private setupApplication() {
		const { routesConfig, dbConn } = this.applicationConfig;
		
		dbConn();
    this.app.use(cors());
		this.app.use(express.json());
		RouterManager.setRoutesInApplication(routesConfig, this.app);
		this.app.use(errorMiddleware);
	}

	public getServer(): Application {
		return this.app;
	}

}

export default ApplicationManager;
