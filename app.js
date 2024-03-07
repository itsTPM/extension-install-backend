const express = require('express');
const app = express();

const state = require('./modules/state');
const { port } = state.getEnv();

const unpackZip = require('./modules/unpackZip');
const prepareExt = require('./modules/prepareExt');
const handleFirefox = require('./modules/handleFirefox');

(async () => {
  await unpackZip();
  await prepareExt();
  await handleFirefox();
})();

function checkExtAvailability(_, res, next) {
  if (!state.getExtension()) {
    res.status(404);
    res.send('Extension not uploaded to the server');
    return;
  }
  next();
}

// Chrome routes
app.get('/extension.crx', checkExtAvailability, require('./routes/extension'));
app.get('/updates.xml', checkExtAvailability, require('./routes/updates'));
app.get('/status', require('./routes/status'));

// Firefox routes
app.use('/firefox', express.static('xpi'));
app.use('/firefox/latest', require('./routes/firefox-latest'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
