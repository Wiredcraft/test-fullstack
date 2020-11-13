import {createLogger, format, transports} from "winston";

const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),format.json()), // JSON format with timestamps
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.timestamp} ${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(format.colorize(), format.simple(), format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)),
    }));
}

export default logger;
