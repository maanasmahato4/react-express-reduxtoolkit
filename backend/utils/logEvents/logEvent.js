const { v4: uuid } = require("uuid");
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require("path");

const LogEvent = async (message, fileName) => {
    const DATE = Date.now();
    const MESSAGE = `${DATE}\t${uuid()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, '../../', 'logs'))) {
            await fsPromise.mkdir(path.join(__dirname, '../../', 'logs'));
        }
        await fsPromise.appendFile(path.join(__dirname, '../../', 'logs', fileName), MESSAGE);
    } catch (error) {
        throw error;
    }
};



module.exports = { LogEvent };