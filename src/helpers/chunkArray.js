const chunkArray = (array, size) => {
  const chunks = [];
  const initialArr = [...array];

  while (initialArr.length) {
    chunks.push(initialArr.splice(0, size));
  }

  return chunks;
};

module.exports = chunkArray;
