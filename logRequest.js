const fs = require('fs');

function logRequest(content, logFile) {
  // Create logs directory if it doesn't exist
  if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
  }

  // Add time & new line character to the content
  content = `[${new Date().toLocaleString()}] - ${content}\n`;
  // Write log files in the logs directory
  logFile = `logs/${logFile}`;

  fs.appendFileSync(logFile, content);
}

module.exports = logRequest;
