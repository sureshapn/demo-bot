const config = require('./config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger/')

// initialize middlewares
const initMiddleware = (app) => {
    app.use(helmet());
    app.use(bodyParser.json({}));
    app.use(cors());
};

// Helmet configurations
const initHelmetHeaders = (app) => {
    // Use helmet to secure Express headers
    var SIX_MONTHS = 15778476000;
    app.use(helmet.xssFilter());
    app.use(helmet.hsts({
        maxAge: SIX_MONTHS,
        includeSubDomains: true,
        force: true,
    }));
    app.disable('x-powered-by');
};

// Server Routes
const initModulesServerRoutes = (app) => {
    const router = express.Router();
    app.use(`${config.urlPrefix}/chat`, require('./routes/chat')(router));
};

// Error Routes
const initErrorRoutes = (app) => {
    // Handle Routes Error
    app.use((err, req, res, next) => {
        // If the error object doesn't exists
        if (!err) {
            return next();
        }
        // Log it
        console.error(err.stack);
        return res.status(500).json({ error: err.stack });
    });
};

// Termination handler
const terminator = (sig) => {
    if (typeof sig === 'string') {
        console.log('%s: Received %s - terminating app ...', Date(Date.now()), sig);
        process.exit(1);
    }
    console.log('%s: Server Stopped.', Date(Date.now()));
};

const setupTerminationHandlers = () => {

    process.on('exit', () => {
        terminator();
    });

    [ 'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
        'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM',
    ].forEach((element) => {
        process.on(element, () => {
            terminator(element);
        });
    });
};

const setupUncaughtException = () => {
    process.on('uncaughtException', (err) => {
        console.log(new Date().toString(), err.stack || err);
        process.kill(process.pid, 'SIGKILL');
    });
};

const setupUnhandledRejection = () => {
    process.on('unhandledRejection', (err) => {
        console.log(new Date().toString(), err.stack || err);
        console.log("this error");
        process.kill(process.pid, 'SIGKILL');
    });
};

const initWinstonLogger = (app) => {
    logger(app, config);
};

const app = express();
initMiddleware(app);
initHelmetHeaders(app);
initWinstonLogger(app);
initErrorRoutes(app);
setupTerminationHandlers();
setupUncaughtException();
setupUnhandledRejection();
initModulesServerRoutes(app);

app.listen(config.port, () => {
    console.log(`App started on port ${config.port}`)
});