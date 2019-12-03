const { readFile } = require('fs');

module.exports.inputData = (day, year = 2019) =>
  new Promise((resolve, reject) =>
    readFile(
      `${__dirname}/../${year}/input/day${day}.txt`,
      (e, file) => e ? reject(e) : resolve(file.toString()))
  );

