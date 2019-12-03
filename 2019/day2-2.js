const { inputData } = require('../util/advent');

const execute = (program) => {
  let halt = false;
  return program.reduce(
    (previousState, _, position) => {
      if (position % 4 === 0) {
        const opcode = previousState[position];
        if (opcode === 99 || halt) {
          halt = true;
          return previousState;
        }

        const nextState = [...previousState];
        const [a, b, target] = [
          nextState[nextState[position + 1]],
          nextState[nextState[position + 2]],
          nextState[position + 3]
        ];
        nextState[target] = opcode === 1 ? a + b : a * b;
        return nextState;
      }

      return previousState;
    },
    [...program])[0];
};

module.exports = (year, day, version) =>
  inputData(day, year)
    .then(data => data.trim().split(',').map(Number))
    .then(program => {
      for(let noun = 0; noun <= 99; ++noun) {
        for (let verb = 0; verb <= 99; ++verb) {
          program[1] = noun;
          program[2] = verb;
          if (execute(program) === 19690720) {
            return `FOUND: noun=${noun}, verb=${verb}, result=${100 * noun + verb}`
          }
        }
      }
    })
    .then(console.log);

