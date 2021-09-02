import { Response, Request, NextFunction } from "express";
import { logger } from ".";
import { ServerResponse } from "../interfaces";

type ControllerFunction = (req: Request) => Promise<ServerResponse>;

/**
 * Encapsulate controller, log event and treats any thrown error
 */
export const withServiceLayer = (functionToExecute: ControllerFunction) => composeGenerator(functionToExecute)

const composeGenerator = (controller: ControllerFunction) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body, query, headers, method } = req;

    logger.info({
      method,
      body,
      query,
      headers
    }, 'EVENT INFO');


    const response = await controller(req);
    const { redirect } = response;
    
    redirect ?
      res.redirect(redirect) :
      res.json(response);

  } catch (err) {
    next(err)
  }
}
