# Twig + Markdown HTML Generator

![GitHub](https://img.shields.io/github/license/andi1984/back2roots)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/andi1984/back2roots?label=Version)
![Node CI](https://github.com/andi1984/back2roots/workflows/Node%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/andi1984/back2roots/badge.svg?branch=develop)](https://coveralls.io/github/andi1984/back2roots?branch=develop)
![GitHub language count](https://img.shields.io/github/languages/count/andi1984/back2roots)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/andi1984/back2roots)

Run `npm run start` to generate the HTML files based on the Markdown files saved inside the `md` folder.

The HTML content of the markdown files is going to be passed as `content` variable to the twig template specified in the respective `template` frontmatter of the markdown file. If none is specified, the `templates/main.twig` file is used as a fallback.

The output files are saved to the `dist` directory.

## NPM scripts

| Name          | Description                                                                              |
| ------------- | ---------------------------------------------------------------------------------------- |
| test          | Self-exploratory: Run your test suite here.                                              |
| tsc           | Runs the typescript compiler and checks for errors                                       |
| dev           | Starts a static file server and watches for content (e.g. template) or typescript files. |
| watch-content | Watches for content (template) changes                                                   |
| watch         | Watches for changes on the core typescript files for the static page generator itself.   |
| build         | Builds the output static HTML files.                                                     |
| assets        | Task for you to generate your assets with.                                               |
| start         | Build HTML files using `build` task and builds assets with `assets` task.                |
| release       | Command to generate a new release version.                                               |

## Twig Template Variables

| Variable |                     Description                      |                                                      Example |
| -------- | :--------------------------------------------------: | -----------------------------------------------------------: |
| title    |                  Title of the page                   |                                "Foo" (default: The filename) |
| sites    |               Array of all build sites               |                          cf. [Site interface](./utils/md.ts) |
| content  |             Content of the page as HTML              |                                 cf. `"<h1>Hello World</h1>"` |
| url      |             The URL of the current page.             |                    e.g. www.my-base-url.com/hello-world.html |
| base_url |               The base url of the page               |                                    cf. URL in env vars below |
| meta     | All metadata provided via frontmatter for given site | cf. {title: 'foo', template: 'bar', author: 'Max Mustermann' |

## CLI Options

| Option   | Alias |                                                                                                  Description | Default |
| -------- | :---: | -----------------------------------------------------------------------------------------------------------: | ------- |
| --pretty |  --p  | Flag to indicate whether hosting can handle pretty URLs (e.g. `/hello/world` instead of `/hello/world.html`) | false   |
| --clean  |  --c  |                           Flag to indicate whether distribution folder should be cleaned before every build. | false   |

## Environment Variables

| Variable |   Description    |                      Example |
| -------- | :--------------: | ---------------------------: |
| URL      | URL of your page | `URL: https://www.google.de` |

## Configuration

You can configure certain parts of the system. All config files are contained within the config folder.

### Hooks

| method       |                                Description                                 |                                  Example |
| ------------ | :------------------------------------------------------------------------: | ---------------------------------------: |
| sitesSorting | Sorts the sites before any further action (e.g. generating the HTML files) | Sort by date metadata/frontmatter field. |
