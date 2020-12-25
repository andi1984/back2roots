const path = require("path");
const copydir = require("copy-dir");

/**
 * Copy everything else than the Markdown file from the source folder to
 * the targetFolder.
 * @param srcFolder
 * @param targetFolder
 */
const copyAssets = (srcFolder: string, targetFolder: string) => {
  return copydir(srcFolder, targetFolder, {
    filter: (stat: string, filepath: string) => {
      // We do not want to copy the Markdown file
      if (stat === "file" && path.extname(filepath) === ".md") {
        return false;
      }

      // We want to copy all the rest.
      return true;
    },
  });
};

module.exports = copyAssets;
