const state = require('../state');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/xml');

  const { id, version, url } = state.getExtension();

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