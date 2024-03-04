const express = require('express');
const app = express();

const state = require('./state');
const { port } = state.getEnv();

const unpackZip = require('./unpackZip');
const prepareExt = require('./prepareExt');

// Self-invoking function to unpack the extension and prepare it for serving
(async () => {
  await unpackZip();
  await prepareExt();
})();

function checkExtAvailability(_, res, next) {
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
