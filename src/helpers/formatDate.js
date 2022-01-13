const padNumber = require("./padNumber");

const formatDate = (date) => {
  if (!date) return null;
  const initialDate = date;

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedValue = `${padNumber(day)}.${padNumber(month)}.${year}`;

  return formattedValue;
};

module.exports = formatDate;
