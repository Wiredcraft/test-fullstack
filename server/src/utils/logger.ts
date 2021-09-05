import pino from "pino";

const pinoPrettier = {
	colorize: true,
	crlf: true,
	errorLikeObjectKeys: ['err', 'error'],
	translateTime: true,
};

export const logger = pino({
	prettyPrint: process.env.ENV_NAME === 'prod' ? false : pinoPrettier
});
