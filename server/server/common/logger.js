const winston = require('winston');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';

const customLevels = {
  levels: {
    alert: 1,
    error: 2,
    warn: 3,
    info: 4,
    debug: 5
  },
  colors: {
    alert: 'red',
    error: 'magenta',
    warn: 'yellow',
    info: 'green',
    debug: 'blue'
  }
};

winston.addColors(customLevels.colors);

const customFormat = winston.format.printf(info => {
  return `[${info.timestamp}] - [${info.level.toUpperCase()}] ${info.message}`;
});

const logger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    customFormat
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug'
    }),
    new winston.transports.File({
      level: 'info',
      filename: './logs/info.log',
      // Max size in bytes of the logfile
      // Max size set as 100MB
      maxsize: 100 * 1024,
      maxFiles: 14,
      // log files will be rolled based on maxsize and maxfiles
      tailable: true,
      zippedArchive: true
    }),
    new winston.transports.File({
      level: 'error',
      filename: './logs/error.log',
      maxsize: 100 * 1024,
      maxFiles: 14,
      tailable: true,
      zippedArchive: true
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: './logs/exception.log'
    })
  ],
  exitOnError: true
});

logger.on('logging', (transport, level, msg, meta) => {
  // TODO: need to support mail sending for alert and error message
});

if (!(fs.existsSync('./logs'))) {
  logger.info('making logs directory');
  fs.mkdirSync('./logs', 0o775);
}

module.exports = logger;
