import ApplicationManager from "./app";
import routesConfig from "./router/routes-config";

const appManager = new ApplicationManager({ routesConfig });

const server = appManager.getServer();

const PORT = process.env.PORT || "3000";

server.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));
