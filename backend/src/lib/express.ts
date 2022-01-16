import {json as bodyParserJson} from 'body-parser';
import cors from 'cors';
import handleErrors from '../api/middlewares/handle-errors';
import notFound from '../api/middlewares/not-found';
import routes from '../api/';

/**
 * Initialize `express` server by adding the required middleware and routes.
 *
 * @async
 *
 */
const initializeExpress: Function = async (): Promise<void> => {
  global.expressApp.use(cors());
  global.expressApp.use(bodyParserJson());
  global.expressApp.use('/', await routes());
  global.expressApp.use(handleErrors);
  global.expressApp.use(notFound);
};

export default initializeExpress;
