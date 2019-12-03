const [year, day, version] = process.argv.slice(2);
const solution = require(`./${year}/day${day}-${version || 1}`);
solution(year, day, version);
