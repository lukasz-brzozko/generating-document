const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const express = require("express");
const open = require("open");
const path = require("path");

const indexRouter = require("./routes/index");
const fileRouter = require("./routes/file");

const baseUrl = "http://localhost";
const port = 3000;
const url = `${baseUrl}:${port}`;

const app = express();

app.engine("handlebars", engine());

app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/file", fileRouter);
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Aplikacja uruchomiona pod adresem ${url}`);
  open(url);
});
