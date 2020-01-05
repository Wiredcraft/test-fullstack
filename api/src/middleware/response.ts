import { RequestHandler } from "express";
import template from "../helpers/template";

const formatResponse: RequestHandler = (req, res, next) => {
  res.success = (result: unknown) => {
    res.json({
      success: true,
      result
    });
  };
  res.error = (
    reason: string,
    values?: { [x: string]: string },
    error?: any
  ) => {
    if (error) {
      // TODO: report error to server, maybe use sentry
    }
    if (values) {
      // eslint-disable-next-line no-param-reassign
      reason = template(reason, values);
    }
    res.json({
      success: false,
      reason
    });
  };
  next();
};

export default formatResponse;
