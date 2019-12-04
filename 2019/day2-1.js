const { inputData } = require('../util/advent');

module.exports = (year, day) =>
  inputData(day, year)
    .then(data => data.trim().split(',').map(Number))
    .then(program => {
      const newProgram = [...program];
      newProgram[1] = 12;
      newProgram[2] = 2;
      return newProgram;
    })
    .then(program => {
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
        program)[0];
    })
    .then(console.log);
