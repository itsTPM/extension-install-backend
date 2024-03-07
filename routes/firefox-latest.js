const state = require('../modules/state');

module.exports = (_, res) => {
  const latestVersion = state.getFirefoxVersion();
  res.redirect(`/firefox/extension-${latestVersion}.xpi`);
};
