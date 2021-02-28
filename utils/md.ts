import { Site, Meta } from "../utils/interfaces";

const path = require("path");
const fs = require("fs");

const { generateURL } = require("./url");
const frontmatterUtils = require("./frontmatter");
const MARKDOWN_FOLDER = require("./constants").MARKDOWN_FOLDER;
const TEMPLATE_FOLDER = require("./constants").TEMPLATE_FOLDER;

const MarkdownIt = require("markdown-it"),
  md = (frontmatterCallback: Function) =>
    new MarkdownIt({
      html: true,
      replaceLink: (link: string) => generateURL(link).toString(),
    })
      .use(require("markdown-it-replace-link"))
      .use(require("markdown-it-front-matter"), frontmatterCallback);

const getSiteObject = (absoluteFilePath: string): Site => {
  const relativeFileFolderToMDFolder = path.relative(
    MARKDOWN_FOLDER,
    path.dirname(absoluteFilePath)
  );
  const fileName = path.basename(absoluteFilePath, ".md");

  // Meta-object
  const DEFAULT_META = {
    title: fileName, // Set default page title to the file name
    template: "main.twig", // Set default template to render
  };
  let meta: Meta = DEFAULT_META;

  // Read in MD file synchronously.
  const mdString = fs.readFileSync(absoluteFilePath, "utf8");
  const htmlOutput = md((frontmatter: string): void => {
    meta = frontmatterUtils
      .frontmatterLines(frontmatter)
      .reduce((acc: any, line: string): object => {
        acc[
          frontmatterUtils.frontmatterTag(line)
        ] = frontmatterUtils.frontmatterValue(line);
        return acc;
      }, DEFAULT_META);
  }).render(mdString);

  return {
    title: meta.title,
    template: path.resolve(TEMPLATE_FOLDER, meta.template),
    html: htmlOutput,
    file: {
      name: fileName,
      abs: absoluteFilePath,
      rel: relativeFileFolderToMDFolder,
    },
    url: generateURL(
      path.relative(MARKDOWN_FOLDER, absoluteFilePath).replace(".md", "")
    ),
    meta,
  };
};

module.exports = { getSiteObject };
