import bodyParser from "body-parser";
import express from "express";
var cors = require('cors');

import { routes } from "./routes";

const server = express();
const port = 3001;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())

server.use(cors());
 
server.get('/ping', (req, res) => {
    res.send('pong');
});

routes.forEach((route) => {
    const { method, path, middleware, handler } = route;
    server[method](path, ...middleware, handler);
});

server.listen(port, () => {
    console.log(`Express listen on ${port}`)
})

export {
    server
}
