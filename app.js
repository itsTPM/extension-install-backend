const express = require('express');
const app = express();
const port = 3000;
const state = require('./state');
const { mkdir, readFile, writeFile } = require('fs/promises');
const crx = require('./crx');
const path = require('path');
const AdmZip = require('adm-zip');

async function unpackZip() {
  const filePath = path.join('./src.zip');
  const file = await readFile(filePath);

  await mkdir('tmp', { recursive: true });

  await writeFile('tmp/extension.zip', file);

  const zip = new AdmZip('tmp/extension.zip');

  await mkdir('tmp/unpacked', { recursive: true });

  await new Promise((resolve, reject) =>
    zip.extractAllToAsync('tmp/unpacked', true, false, (err) => {
      if (err) reject(err);
      resolve(undefined);
    })
  );
}

async function prepareExt() {
  let manifest;
  let id, packed;

  try {
    manifest = await readFile('tmp/unpacked/manifest.json');
    manifest = JSON.parse(manifest.toString('utf-8'));
  } catch (e) {
    return console.log(`Error reading manifest.json: ${e}`);
  }

  manifest.update_url = `http://localhost/updates.xml`;

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

async function init() {
  await unpackZip();
  await prepareExt();
}

init();

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
  console.log(`Example app listening on port ${port}`);
});
