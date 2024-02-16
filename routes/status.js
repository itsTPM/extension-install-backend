const state = require("../state");

module.exports = (_, res) => {
  const extension = state.getExtension();

  res.setHeader("Content-Type", "application/json");
  res.send(
    JSON.stringify(
      extension
        ? {
          serving: true,
          id: extension.id,
          name: extension.name,
          version: extension.version
        }
        : { serving: false }
    )
  );
};