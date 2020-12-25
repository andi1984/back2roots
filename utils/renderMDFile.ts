// https://stackoverflow.com/a/41975448/778340
export {};

import { Site } from "./interfaces";

const path = require("path");
const fs = require("fs");

const minify = require("html-minifier").minify;
const Twig = require("twig");

const DISTRIBUTION_FOLDER = require("./constants").DISTRIBUTION_FOLDER;
const copyAssets = require("./copyAssets");

module.exports = async (site: Site, sites: Site[]) => {
  if (!fs.existsSync(DISTRIBUTION_FOLDER)) {
    fs.mkdirSync(DISTRIBUTION_FOLDER);
  }

  // NOTE: Workaround of https://github.com/twigjs/twig.js/issues/509 to fail
  // early in case of template does not exists, because renderFile is failing
  // silently in that case.
  if (!fs.existsSync(site.template)) {
    throw new Error(`Template ${site.template} does not exist.`);
  }

  Twig.renderFile(
    site.template,
    {
      title: site.title,
      sites,
      content: site.html,
      meta: site.meta,
      url: site.url,
      base_url: process.env.URL,
    },
    (err: Error, html: string) => {
      return new Promise<void>((resolve, reject) => {
        if (err) {
          reject(err);
        }

        const outputFilePath = path.join(
          DISTRIBUTION_FOLDER,
          site.file.rel,
          `${site.file.name}.html`
        );

        const targetFolder = path.dirname(outputFilePath);

        // Create folder in case it doesn't exist already.
        if (!fs.existsSync(targetFolder)) {
          fs.mkdirSync(targetFolder, {
            recursive: true,
          });
        }

        const srcFolder = path.dirname(site.file.abs);

        // Copy any other assets from src to targetFolder
        copyAssets(srcFolder, targetFolder);

        // Write the file into the folder
        fs.writeFile(
          outputFilePath,
          minify(html, {
            collapseWhitespace: true,
          }),
          (writeErr: Error) => {
            if (writeErr) {
              reject(writeErr);
            } else {
              resolve();
            }
          }
        );
      });
    }
  );
};
