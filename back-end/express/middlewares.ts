import { RequestHandler } from 'express';

export const requestLogger: RequestHandler = (req, res, next) => {
    console.log('requestLogger', req.path);
    next();
};