const express = require("express");
const path = require("path");

const { generatePDF } = require("../src/generatePDF");
const { getTags, render } = require("../src/generateDocument");

const router = express.Router();

let filePath = null;

router.post("/", (req, res, next) => {
  const { file } = req.body;
  filePath = file;

  const tags = getTags(filePath);

  if (tags.length === 0)
    return res.render("error", {
      title: `Nie znaleziono żadnych znaczników w wybranym dokumencie.
      <br>
      Każdy znacznik składa się z klamry otwierającej, nazwy znacznika oraz klamry zamykającej, np. <strong>{adres_witryny}</strong>`,
    });

  res.render("file", { tags, filename: path.parse(file).name });
});

router.post("/docx", (req, res) => {
  const params = req.body;

  const docxFilePath = render(filePath, params);

  res.download(docxFilePath);
});

router.post("/pdf", async (req, res) => {
  const params = req.body;

  try {
    const docxFilePath = render(filePath, params);

    const pdfFilePath = await generatePDF(docxFilePath);

    res.download(pdfFilePath);
  } catch (err) {
    res.render("error", "Wystąpił błąd");
  }
});

module.exports = router;
