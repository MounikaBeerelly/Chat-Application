const log4js = require('log4js');

log4js.configure({
    appenders: {
        debug: { type: "file", filename: "logs/debug.log" },
        error: { type: "file", filename: "logs/error.log" },
        trace: { type: "file", filename: "logs/trace.log" }
    },
    categories: {
        default: { appenders: ["debug"], level: "debug" },
        debug: { appenders: ["debug"], level: "debug" },
        error: { appenders: ["error"], level: "error" },
        trace: { appenders: ["trace"], level: "trace" },
    }
});

const debugLogger = log4js.getLogger('debug');
const errorLogger = log4js.getLogger('error');
const traceLogger = log4js.getLogger('trace');

function debug(log) {
    debugLogger.debug(log);
};

function error(log) {
    errorLogger.error(log);
};

function trace(log) {
    traceLogger.trace(log);
};

module.exports = { debug, error, trace };