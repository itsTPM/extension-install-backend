const json = require('../firefoxUpdates.json');

module.exports = (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(json));
};
