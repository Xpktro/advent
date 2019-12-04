const { inputData } = require('../util/advent');

const consecutiveNumbers = password => password.match(/(\d)\1/g);
const increasingDigits = password =>
  Array.from(password.slice(1)).reduce(
    (result, digit, pos) => result && (+digit >= +password[pos]),
    true
  );

const valid = password => consecutiveNumbers(password) && increasingDigits(password);

module.exports = (year, day) =>
  inputData(day, year)
    .then(data => data.trim().split('-').map(Number))
    .then(([lower, upper]) => {
      let amount = 0;
      for (let password = lower; password <= upper; ++password) {
        if(valid('' + password)) {
          amount++;
        }
      }
      return amount;
    })
    .then(console.log)
