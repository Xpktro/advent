const { inputData } = require('../util/advent');

const calculateFuel = masses =>
  masses.map(number => Math.floor(number / 3) - 2);

const sum = masses => masses.reduce((sum, x) => x + sum, 0);

module.exports = (year, day) =>
  inputData(day, year)
    .then(data => data.trim().split('\n').map(Number))
    .then(calculateFuel)
    .then(masses => {
      let totalSum = sum(masses);
      let newMasses = masses.filter(mass => mass > 0);
      while(newMasses.length > 0) {
        newMasses = calculateFuel(newMasses);
        newMasses = newMasses.filter(mass => mass > 0);
        totalSum += sum(newMasses);
      }
      return totalSum;
    })
    .then(console.log);
