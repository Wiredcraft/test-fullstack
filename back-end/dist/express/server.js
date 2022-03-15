"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
var cors = require('cors');
const routes_1 = require("./routes");
const server = (0, express_1.default)();
exports.server = server;
const port = 3001;
server.use(body_parser_1.default.urlencoded({ extended: false }));
server.use(body_parser_1.default.json());
server.use(cors());
server.enable('etag');
server.get('/ping', (req, res) => {
    res.send('pong');
});
routes_1.routes.forEach((route) => {
    const { method, path, middleware, handler } = route;
    server[method](path, ...middleware, handler);
});
server.listen(port, () => {
    console.log(`Express listen on ${port}`);
});
