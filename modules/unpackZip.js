const { mkdir, readFile, writeFile } = require('fs/promises');
const AdmZip = require('adm-zip');
const path = require('path');

async function unpackZip() {
  const filePath = path.join('./build.zip');
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

module.exports = unpackZip;