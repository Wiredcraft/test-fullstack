import { config } from 'dotenv';
config({ path: './.env' });

import ApplicationManager from "./app";
import routesConfig from "./router/routes-config";
import { logger } from './utils';
import dbConn from "./utils/db";

const appManager = new ApplicationManager({ routesConfig, dbConn });

const server = appManager.getServer();

const PORT = process.env.PORT || "5000";

server.listen(PORT, () => logger.info(`Server Running on http://localhost:${PORT}`));
