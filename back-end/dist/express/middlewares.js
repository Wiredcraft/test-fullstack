"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    // console.log('requestLogger', req.method, req.path);
    next();
};
exports.requestLogger = requestLogger;
