const path = require('path');
const logRequest = require('../modules/logRequest');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/x-chrome-extension');
  res.sendFile(path.resolve('tmp/extension.crx'));
  if (req.query?.guide) {
    // This param would appear if the user made request from guide (extension-install-frontend)
    logRequest('Extension .crx downloaded from guide', 'guide.log');
  } else {
    logRequest('Extension .crx downloaded', 'crx.log');
  }
};
