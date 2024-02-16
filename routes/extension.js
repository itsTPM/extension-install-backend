const path = require("path");

module.exports = (_, res) => {
  res.setHeader("Content-Type", "application/x-chrome-extension");
  res.sendFile(path.resolve("tmp/extension.crx"));
};
