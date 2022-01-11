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

Handlebars.registerHelper("isSpecialInput", (string) => {
  const regex = /(\$|=)/g;
  const indexOfSymbol = string.search(regex);

  return indexOfSymbol === 0 ? true : false;
});

Handlebars.registerHelper("shouldAddContainer", (index) => {
  if (index === 0) return true;

  return (index + 1) % 6 === 0;
});
