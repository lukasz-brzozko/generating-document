const express = require("express");
const glob = require("glob");
const path = require("path");
const childProcess = require("child_process");

const router = express.Router();

router.get("/", (req, res) => {
  let templateFiles = [];
  glob("./templates/*.docx", {}, function (er, files) {
    templateFiles = files.map((file) => {
      templateFiles.push({
        name: path.basename(file),
        path: file,
      });
    });
  });

  res.render("index", { templateFiles });
});

router.post("/templates", (req, res) => {
  childProcess.exec(`start "" "${path.resolve(process.cwd(), "templates")}"`);

  res.json({ status: "ok" });
});

router.get("*", (req, res) => {
  res.redirect("/");
});

module.exports = router;
