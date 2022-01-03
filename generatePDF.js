const path = require("path");
const fs = require("fs").promises;
const libre = require("libreoffice-convert");

libre.convertAsync = require("util").promisify(libre.convert);

async function generatePDF(filePath) {
  const ext = ".pdf";
  const inputPath = filePath;
  const fileName = path.parse(filePath).name;
  const outputPath = path.join(__dirname, `/output/${fileName}${ext}`);

  // Read file
  const docxBuf = await fs.readFile(inputPath);

  // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
  let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

  // Here in done you have pdf file which you can save or transfer in another stream
  await fs.writeFile(outputPath, pdfBuf);

  return outputPath;
}

module.exports = { generatePDF };
