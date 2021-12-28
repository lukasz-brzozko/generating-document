const express = require("express");
const { engine } = require("express-handlebars");
const formidable = require("formidable");
const open = require("open");
const bodyParser = require("body-parser");

const { render, getTags } = require("./generateDocument");
const { param } = require("express/lib/request");

const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

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
    if (file.originalFilename === "") return res.send("No tags found");

    const tags = getTags(filePath);

    if (tags.length === 0) return res.send("No tags found");

    res.render("file", { tags });
  });
});

app.post("/file/tags", (req, res) => {
  const params = req.body;

  const outputFilePath = render(filePath, params);

  res.sendFile(outputFilePath);
});

app.listen(port, () => {
  open(url);
});
