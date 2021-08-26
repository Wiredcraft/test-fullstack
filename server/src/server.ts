import ApplicationManager from "./app";

const appManager = new ApplicationManager();

const server = appManager.getServer();

const PORT = process.env.PORT || "3000";

server.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));

server.get('/', (req, res) => res.json('ok'));
