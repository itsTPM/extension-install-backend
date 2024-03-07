const fs = require('fs');
const path = require('path');
const state = require('./state');

module.exports = () => {
  const xpiDir = path.join(__dirname, '../xpi');

  if (!fs.existsSync(xpiDir)) {
    console.error('Directory xpi not found!');
    return;
  }

  if (fs.readdirSync(xpiDir).length === 0) {
    console.error('Directory xpi is empty!');
    return;
  }

  const xpiList = fs.readdirSync(xpiDir).filter((file) => file.endsWith('.xpi'));
  const updates = [];
  const { url } = state.getEnv();

  xpiList.forEach((file) => {
    const version = file.replace('extension-', '').replace('.xpi', '');
    const updateLink = `${url}/firefox/${file}`;
    const obj = { version, update_link: updateLink };
    updates.push(obj);
  });

  fs.writeFileSync(
    path.join(xpiDir, 'updates.json'),
    JSON.stringify({ addons: { '{foxford-tools@itstpm.tech}': { updates } } })
  );

  const latestVersion = updates.reduce((prev, current) => (prev.version > current.version ? prev : current));

  state.setFirefoxVersion(latestVersion.version);
};
