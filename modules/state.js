require('dotenv').config();

let _extId;
let _extName;
let _extVersion;
let _firefoxVersion;
let _url = process.env.URL || 'http://localhost:3000';
let _port = process.env.PORT || 3000;

function setExtension(id, name, version) {
  _extId = id;
  _extName = name;
  _extVersion = version;
}

function getExtension() {
  if (!_extId || !_extName || !_extVersion) return undefined;

  return {
    id: _extId,
    name: _extName,
    version: _extVersion,
  };
}

function getEnv() {
  return {
    url: _url,
    port: _port,
  };
}

function setFirefoxVersion(version) {
  _firefoxVersion = version;
}

function getFirefoxVersion() {
  return _firefoxVersion;
}

module.exports = {
  setExtension,
  getExtension,
  getEnv,
  setFirefoxVersion,
  getFirefoxVersion,
};
