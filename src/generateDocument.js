const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const InspectModule = require("docxtemplater/js/inspect-module");

const fs = require("fs");
const path = require("path");

const getTags = (filePath) => {
  const iModule = InspectModule();

  const content = fs.readFileSync(filePath, "binary");
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    modules: [iModule],
  });
  const tags = iModule.getAllTags();
  const tagsArr = Object.keys(tags);

  return tagsArr;
};

const render = (inputFilePath, params) => {
  // Load the docx file as binary content
  const content = fs.readFileSync(inputFilePath, "binary");
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  // render the document
  // (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
  doc.render(params);
  const buf = doc.getZip().generate({ type: "nodebuffer" });

  const outputFilePath = path.resolve(
    process.cwd(),
    "output",
    path.basename(inputFilePath)
  );

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  fs.writeFileSync(outputFilePath, buf);

  return outputFilePath;
};

module.exports = { getTags, render };
