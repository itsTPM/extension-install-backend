const json = require('./xpi/updates.json');

module.exports = (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(json);
};
