const { LogEvent } = require("../utils/logEvents/logEvent");

const ErrorHandler = (err, req, res, next) => {
    const MESSAGE = `${req.headers.origin}\t${req.url}\t${req.method}\t${err}`;
    LogEvent(MESSAGE, 'errorLogs.log');
}


module.exports = { ErrorHandler };