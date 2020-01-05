import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err.name === "UnauthorizedError") {
    return res.status(401).send("invalid token...");
  }
  return res.status(400).json({
    success: false,
    error: err
  });
};

export default errorHandler;
