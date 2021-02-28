const { isAbsoluteURL, generateURL } = require("../url");

jest.mock("../args");

describe("isAbsoluteURL", () => {
  test("it fails if url is not given", () => {
    expect(() => isAbsoluteURL()).toThrow();
  });

  test("it returns true if url is absolute", () => {
    expect(isAbsoluteURL("https://www.google.com")).toBe(true);
  });

  test("it returns false if url is relative", () => {
    expect(isAbsoluteURL("../foo")).toBe(false);
  });
});

describe("generateURL", () => {
  // Restore original env vars
  // NOTE: https://stackoverflow.com/a/48042799/778340
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // most important - it clears the cache
    process.env = { ...OLD_ENV }; // make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // restore old env
  });

  test("it fails if url is not given or not valid", () => {
    expect(() => generateURL()).toThrow();
  });

  test("pathname", () => {
    expect(generateURL("http://www.google.de").pathname).toBe("/");
    expect(generateURL("http://www.google.de/foo").pathname).toBe("/foo");
  });

  test("href", () => {
    expect(generateURL("http://www.google.de").href).toBe(
      "http://www.google.de/"
    );

    expect(generateURL("http://www.google.de/foo?myquery=2").href).toBe(
      "http://www.google.de/foo?myquery=2"
    );

    expect(generateURL("http://www.google.de/foo?myquery=2&foo=2").href).toBe(
      "http://www.google.de/foo?myquery=2&foo=2"
    );
  });

  test("Removes /index on pretty mode", () => {
    process.env.PRETTY = "true";
    process.env.URL = "http://foo.de";
    expect(generateURL("subfolder/index").href).toBe("http://foo.de/subfolder");
  });

  test("Does not remove /index.html on non-pretty mode", () => {
    process.env.PRETTY = "false";
    process.env.URL = "http://foo.de";
    expect(generateURL("subfolder/index").href).toBe(
      "http://foo.de/subfolder/index.html"
    );
  });

  test("Does not remove trailing segments other than index on pretty mode", () => {
    process.env.PRETTY = "true";
    process.env.URL = "http://foo.de";
    expect(generateURL("subfolder/impressum").href).toBe(
      "http://foo.de/subfolder/impressum.html"
    );
  });
});
