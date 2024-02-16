const express = require('express');
const app = express();
const state = require('./state');

const unpackZip = require('./unpackZip');
const prepareExt = require('./prepareExt');

async function init() {
  await unpackZip();
  await prepareExt();
}

init();

const { port } = state.getEnv();

function checkExtAvailability(req, res, next) {
  if (!state.getExtension()) {
    res.status(404);
    res.send('Extension not uploaded to the server');
    return;
  }
  next();
}

app.get('/extension.crx', checkExtAvailability, require('./routes/extension'));
app.get('/updates.xml', checkExtAvailability, require('./routes/updates'));
app.get('/status', require('./routes/status'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
