import { URL } from "url";

// https://stackoverflow.com/a/41975448/778340
export {};

/**
 * Returns whether URL is absolute or not.
 * @param {string} url
 * @returns {boolean}
 */
const isAbsoluteURL = (url: string): Boolean => {
  return url.indexOf("://") > 0 || url.indexOf("//") === 0;
};

/**
 * Generates a new URL for the given link.
 * @param {string} link
 * @returns {URL}
 */
const generateURL = (link: string): URL => {
  if (isAbsoluteURL(link)) {
    return new URL(link);
  }

  if (process.env.PRETTY === "true" && link.endsWith("index")) {
    // In case we have support for pretty urls and link ends with index, we omit the last URL segment
    return new URL(link.replace(/\/index$/g, ""), process.env.URL);
  }

  return new URL(`${link}.html`, process.env.URL);
};

module.exports = {
  // https://stackoverflow.com/a/38979205/778340
  isAbsoluteURL,
  generateURL,
};
