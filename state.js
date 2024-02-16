let _extId;
let _extName;
let _extVersion;

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

module.exports = {
  setExtension,
  getExtension,
};
