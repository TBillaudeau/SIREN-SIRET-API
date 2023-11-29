const fs = require('fs');

function logAction(action) {
    const log = `${new Date().toISOString()} - ${action}\n`;
    fs.appendFileSync('log.txt', log, 'utf8');
}

module.exports = {
    logAction
};