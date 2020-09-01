const { isAbsoluteURL, generateURL } = require('../url');

jest.mock('../args');

describe('isAbsoluteURL', () => {
  test('it fails if url is not given', () => {
    expect(() => isAbsoluteURL()).toThrow();
  });

  test('it returns true if url is absolute', () => {
    expect(isAbsoluteURL('https://www.google.com')).toBe(true);
  });

  test('it returns false if url is relative', () => {
    expect(isAbsoluteURL('../foo')).toBe(false);
  });
});


describe('generateURL', () => {
    test('it fails if url is not given or not valid', () => {
        expect(() => generateURL()).toThrow();
    })

    test('pathname', () => {
        expect(generateURL('http://www.google.de').pathname).toBe('/');
        expect(generateURL('http://www.google.de/foo').pathname).toBe('/foo');
    })

    test('href', () => {
        expect(generateURL('http://www.google.de').href).toBe(
          'http://www.google.de/'
        );

        expect(generateURL('http://www.google.de/foo?myquery=2').href).toBe(
          'http://www.google.de/foo?myquery=2'
        );
    })

    test('Removes /index on prettyfied mode', () => {
      process.env.URL = 'http://foo.de';
      expect(generateURL('subfolder/index').href).toBe('http://foo.de/subfolder')
    })
})
