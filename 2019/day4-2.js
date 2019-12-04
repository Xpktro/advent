const { inputData } = require('../util/advent');

const evenRepeatingDigits = password => {
  const groups = password.match(/(\d)\1+/g);
  return groups
    && groups
      .map(group => group.length)
      .includes(2);
}
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
      let validPasswords = [];
      for (let password = lower; password <= upper; ++password) {
        if(valid('' + password)) {
          validPasswords.push(password);
        }
      }
      return validPasswords.reduce(
        (amount, password) =>
          evenRepeatingDigits('' + password)
            ? amount + 1
            : amount,
        0
      );
    })
    .then(console.log)
