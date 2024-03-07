const { readFile, writeFile } = require('fs/promises');
const state = require('./state');
const crx = require('./crx');

async function prepareExt() {
  let manifest;
  let id, packed;

  try {
    manifest = await readFile('tmp/unpacked/manifest.json');
    manifest = JSON.parse(manifest.toString('utf-8'));
  } catch (e) {
    return console.log(`Error reading manifest.json: ${e}`);
  }

  const { url } = state.getEnv();

  manifest.update_url = `${url}/updates.xml`;

  try {
    await writeFile('tmp/unpacked/manifest.json', JSON.stringify(manifest));
  } catch (e) {
    return console.log(`Error writing manifest.json: ${e}`);
  }

  try {
    const result = await crx.createCrx('tmp/unpacked');
    id = result.id;
    packed = result.packed;
  } catch (e) {
    return console.log(`Error packing extension: ${e}`);
  }

  try {
    await writeFile('tmp/extension.crx', packed);
  } catch (e) {
    return console.log(`Error writing extension.crx: ${e}`);
  }

  state.setExtension(id, manifest.name, manifest.version);
}

module.exports = prepareExt;
