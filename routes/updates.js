const state = require('../modules/state');
const logRequest = require('../modules/logRequest');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/xml');

  const { id, version } = state.getExtension();
  const { url } = state.getEnv();

  if (Object.keys(req.query).length) {
    console.log('Request with query parameters: ', req.query);

    if (req.query?.prod && req.query?.prodchannel && req.query?.prodversion) {
      // Chromium-based browsers send request with these query parameters when checking for updates
      logRequest(`Autoupdate request with these params: ${JSON.stringify(req.query)}`, 'autoupdate.log');
    } else {
      // If none of expected params are present
      logRequest('Unexpected params', 'other.log');
    }
  } else {
    // If no query parameters are present
    logRequest('Request without params', 'other.log');
  }

  // prettier-ignore
  res.send(`
<?xml version='1.0' encoding='UTF-8'?>
<gupdate xmlns='http://www.google.com/update2/response' protocol='2.0'>
  <app appid='${id}'>
    <updatecheck codebase='${url}/extension.crx' version='${version}' />
  </app>
</gupdate>
  `.trim());
};
