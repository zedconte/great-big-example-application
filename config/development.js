
const path = require('path');

const root = process.cwd();

module.exports = {
  logs: {
    logLevel: 'silly',
    path: path.join(root, 'server/logs-dev'),
    logConsoleLevel: 'silly',
  },
  database: {
    path: path.join(root, 'server/data-dev'),
  },
};
