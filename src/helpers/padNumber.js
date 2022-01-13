const padNumber = (number) => {
  return number < 10 ? `0${number}` : number;
};

module.exports = padNumber;
