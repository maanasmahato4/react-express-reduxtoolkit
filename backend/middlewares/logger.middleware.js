const { LogEvent } = require("../utils/logEvents/logEvent");

const Logger = async (req, res, next) => {
    const MESSAGE = `${req.method}\t${req.url}\t${req.headers.origin}`
    try {
        await LogEvent(MESSAGE, 'requestLogs.log');
    } catch (error) {
        return next(error);
    }
    next();
};

module.exports = { Logger };