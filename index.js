const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const formidable = require("formidable");
const open = require("open");
const bodyParser = require("body-parser");

const { render, getTags } = require("./generateDocument");
const { generatePDF } = require("./generatePDF");
const { param } = require("express/lib/request");

const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const baseUrl = "http://localhost";
const port = 3000;
const url = `${baseUrl}:${port}`;

let filePath = null;

app.get("/", (req, res) => {
  res.render("index");
});

app.get("*", (req, res) => {
  res.redirect("/");
});

app.post("/file", (req, res, next) => {
  const form = formidable();

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
  });

  form.on("fileBegin", (name, file) => {
    filePath = `./templates/${file.originalFilename}`;
    file.filepath = filePath;
  });

  form.on("file", (name, file) => {
    if (file.originalFilename === "")
      return res.render("error", { title: "Nie znaleziono żadnych tagów" });

    const tags = getTags(filePath);

    if (tags.length === 0)
      return res.render("error", { title: "Nie znaleziono żadnych tagów" });

    res.render("file", { tags });
  });
});

app.post("/file/docx", (req, res) => {
  const params = req.body;

  const docxFilePath = render(filePath, params);

  res.download(docxFilePath);
});

app.post("/file/pdf", async (req, res) => {
  const params = req.body;

  try {
    const docxFilePath = render(filePath, params);

    const pdfFilePath = await generatePDF(docxFilePath);

    res.download(pdfFilePath);
  } catch (err) {
    res.render("error", "Wystąpił błąd");
  }
});

app.listen(port, () => {
  open(url);
});
