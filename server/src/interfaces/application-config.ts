import { ICustomRoute } from "./route";

export interface IApplicationConfig {
	routesConfig: ICustomRoute[],
	dbConn(): void;
}
