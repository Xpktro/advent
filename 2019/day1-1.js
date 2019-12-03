const { inputData } = require('../util/advent');

module.exports = (year, day) =>
  inputData(day, year)
    .then(data => data.trim().split('\n').map(Number))
    .then(data => data.map(number => Math.floor(number / 3) - 2))
    .then(data => data.reduce((sum, x) => x + sum, 0))
    .then(console.log);
