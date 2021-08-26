import express, { Application } from "express";

class ApplicationManager {
	private app: Application;

	constructor() {
		this.app = express();
	}

	public getServer(): Application {
		return this.app;
	}

}

export default ApplicationManager;