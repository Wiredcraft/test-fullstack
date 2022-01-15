import {json as bodyParserJson} from 'body-parser';
import cors from 'cors';

/**
 * Initialize `express` server by adding the required middleware and routes.
 */
const initializeExpress: Function = async (): Promise<void> => {
  global.expressApp.use(cors());
  global.expressApp.use(bodyParserJson());
};

export default initializeExpress;
