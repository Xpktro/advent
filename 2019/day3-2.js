const { inputData } = require('../util/advent');

const go = (position, direction) => {
  const moves = {
    D: (pos, amount) => ({ ...pos, y: pos.y - amount }),
    U: (pos, amount) => ({ ...pos, y: pos.y + amount }),
    L: (pos, amount) => ({ ...pos, x: pos.x - amount }),
    R: (pos, amount) => ({ ...pos, x: pos.x + amount }),
  };
  const amount = +direction.slice(1);
  const where = moves[direction[0]](position, amount);
  return { where, amount };
};

const extractVectors = wire =>
  wire.reduce(
    ({ vectors, position, steps }, direction) => {
      const { where, amount } = go(position, direction);
      const newSteps = steps + amount;
      return {
        vectors: vectors.concat({ ...where, steps: newSteps }),
        position: where,
        steps: newSteps
      };
    },
    { vectors: [{ x: 0, y: 0, steps: 0 }], position: { x: 0, y: 0 }, steps: 0 }
  ).vectors;

const groupInPairs = vectors => vectors.slice(1)
  .reduce(
    (pairs, vector, position) =>
      pairs.concat([[vectors[position], vector]]),
    []
  );

const intersect = (
  [{ x: x1, y: y1 }, { x: x2, y: y2 }],
  [{ x: x3, y: y3 }, { x: x4, y: y4 }]
) => {

  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false;
  }

  const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  // Lines are parallel
  if (denominator === 0) {
    return false;
  }

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false;
  }

  // Return a object with the x and y coordinates of the intersection
  const x = x1 + ua * (x2 - x1);
  const y = y1 + ua * (y2 - y1);

  return x === 0 && y === 0 ? null : { x, y };
};

const distance = (
  { x: u1, y: u2 },
  { x: v1, y: v2 }
) => Math.sqrt(Math.pow(u1 - v1, 2) + Math.pow(u2 - v2, 2));

module.exports = (year, day) =>
  inputData(day, year)
    .then(data => data.trim().split('\n').map(line => line.split(',')))
    .then(([firstWire, secondWire]) => {
      const firstWireVectors = groupInPairs(extractVectors(firstWire));
      const secondWireVectors = groupInPairs(extractVectors(secondWire));
      const allIntersections = firstWireVectors.reduce(
        (intersections, firstWireVectorGroup) =>
          secondWireVectors.reduce(
            (intersections, secondWireVectorGroup) => {
              const intersects = intersect(firstWireVectorGroup, secondWireVectorGroup);
              if (!intersects) return intersections;
              const [firstStart, secondStart] = [firstWireVectorGroup[0], secondWireVectorGroup[0]];
              const stepsFromFirstStart = distance(firstStart, intersects);
              const stepsFromSecondStart = distance(secondStart, intersects);
              return intersections.concat({
                ...intersects,
                steps: firstStart.steps + secondStart.steps + stepsFromFirstStart + stepsFromSecondStart
              });
            },
            intersections
          ),
        []
      );
      const closestIntersection = allIntersections.reduce(
        (closest, { steps }) => {
          return steps < closest ? steps : closest;
        },
        allIntersections[0].steps
      );
      return closestIntersection;
    })
    .then(console.log);
