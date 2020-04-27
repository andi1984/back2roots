import { URL } from 'url';

// https://stackoverflow.com/a/41975448/778340
export { };
  
/**
 * Returns whether URL is absolute or not.
 * @param {string} url 
 * @returns {boolean}
 */
const isAbsoluteURL = (url: string): Boolean => {
  return url.indexOf('://') > 0 || url.indexOf('//') === 0;
};

/**
 * Generates a new URL for the given link.
 * @param {string} link
 * @returns {URL}
 */
const generateURL = (link: string): URL => {
  return new URL(
    Boolean(process.env.PRETTY_URLS) ||
    isAbsoluteURL(link) ||
    link.indexOf('.html') !== -1
      ? link
      : `${link}.html`,
    process.env.URL
  );
};

module.exports = {
  // https://stackoverflow.com/a/38979205/778340
  isAbsoluteURL,
  generateURL,
};
