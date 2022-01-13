const chunkArray = require("./helpers/chunkArray");

const Handlebars = require("handlebars");

Handlebars.registerHelper("hasDefaultValue", (string) => {
  const indexOfSymbol = string.lastIndexOf("=");
  return indexOfSymbol !== -1 ? string.substr(indexOfSymbol + 1) : false;
});

Handlebars.registerHelper("isChoosingType", (string) => {
  const indexOfSymbol = string.indexOf("$c");
  const lastIndexOfSymbol = string.lastIndexOf("$");
  return indexOfSymbol !== -1
    ? string.substring(indexOfSymbol + 2, lastIndexOfSymbol)
    : false;
});

Handlebars.registerHelper("isNumberType", (string) => {
  const indexOfSymbol = string.indexOf("$n");
  return indexOfSymbol !== -1 ? true : false;
});

Handlebars.registerHelper("isDateType", (string) => {
  const indexOfSymbol = string.indexOf("$d");
  return indexOfSymbol !== -1 ? true : false;
});

Handlebars.registerHelper("isLongType", (string) => {
  const indexOfSymbol = string.indexOf("$l");
  return indexOfSymbol !== -1 ? true : false;
});

Handlebars.registerHelper("isRequired", (string) => {
  const indexOfSymbol = string.indexOf("$o");
  return indexOfSymbol !== -1 ? false : true;
});

Handlebars.registerHelper("isSpecialInput", (string) => {
  const regex = /(\$|=)/g;
  const indexOfSymbol = string.search(regex);

  return indexOfSymbol === 0 ? true : false;
});

Handlebars.registerHelper("shouldAddContainer", (index) => {
  if (index === 0) return true;

  return index % 6 === 0;
});

Handlebars.registerHelper("chunkArray", (array, size) => {
  const chunks = chunkArray(array, size);

  return chunks;
});

Handlebars.registerHelper("isMultiStep", (array, size) => {
  const chunks = chunkArray(array, size);

  return chunks.length > 1;
});
