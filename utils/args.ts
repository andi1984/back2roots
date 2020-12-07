export {};

const yargs = require("yargs");

// Exports all CLI arguments
module.exports = yargs.option("clean", {
  alias: "c",
  describe: "Cleanup dist folder on startup",
  type: "boolean",
}).argv;
