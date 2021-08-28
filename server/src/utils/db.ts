import { connect } from "mongoose";
import { logger } from "./logger";
const MONGO_URL = process.env.CONNECTIONSTRING
	|| process.env.MONGO_URL
	|| '';

export default () => connect(MONGO_URL).then(
	() => { logger.info('DB CONNECTED') },
	(err) => logger.info(`ERROR DURING DB CONNECTION::::::${err}`))
