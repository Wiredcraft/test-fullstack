import winston from 'winston';

/**
 * Get logger transport (options) according to the running Node environment.
 * @return {ConsoleTransportOptions} Winston console transport.
 */
const getLoggerTransport: Function = (
): winston.transports.ConsoleTransportOptions => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        format: winston.format.combine(
            winston.format.cli(),
            winston.format.splat(),
        ),
      };
    case 'testing':
      return {
        silent: true,
      };
    default:
      return {};
  }
};

/**
 * Winston Logger instance set with [[Config]] configuration.
 * @param {string} level Winston log level.
 * @return {winston.Logger} Winston logger instance.
 */
const LoggerInstance: Function = (
    level: string,
): winston.Logger => {
  /**
   * Winston transports.
   * See [Winston documentation for explanation.](https://github.com/winstonjs/winston#multiple-transports-of-the-same-type)
   */
  const transports: Array<winston.transports.ConsoleTransportInstance> = [
    new winston.transports.Console(getLoggerTransport()),
  ];

  return winston.createLogger({
    level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({stack: true}),
        winston.format.splat(),
        winston.format.json(),
    ),
    transports,
  });
};

export default LoggerInstance;
