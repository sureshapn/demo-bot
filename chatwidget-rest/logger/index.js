'use strict';
const util = require('util');
const { createLogger, transports, format } = require('winston');
const morgan = require('morgan');

const loggerCreate = (config) => createLogger({
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
      new transports.File({
        filename: config.logPath,
        json: false,
        maxsize: 5242880,
        maxFiles: 5,
      }),
      new transports.Console(),
    ]
  })


const response = (req, res, next) => {
    res.success = (res, data) => {
        res.status(200).json({
            status: 'success',
            data: data || null,
        })
    };

    res.fail = (res, message) => {
        res.status(400).json({
            status: 'fail',
            message: message || null,
        });
    };

    res.message = (res, code, message) => {
        res.status(code).json({
            status: 'fail',
            message: message || null,
        });
    };
    next();
}

module.exports = (app, config) => {
    const logger = loggerCreate(config)
    logger.stream = {
        write: message => logger.info(message.substring(0, message.lastIndexOf('\n')))
    };
    app.use(response);
    app.use(morgan(
        ':method :url :status :response-time ms - :res[content-length]',
        { stream: logger.stream }
      ))
};
