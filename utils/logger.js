const fs = require('fs');

/**
 * Logs an action with a timestamp to a log file.
 *
 * @param {string} action - The action to be logged.
 */
function logAction(action) {
    const log = `${new Date().toISOString()} - ${action}\n`;
    fs.appendFileSync('log.txt', log, 'utf8');
}

// Export the module
module.exports = {
    logAction
};