import { loadInput, sum } from "../utils";

const input = loadInput("challenges/day-03/input");

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const results = [];
let match;

while ((match = regex.exec(input)) !== null) {
  const A = Number(match[1]);
  const B = Number(match[2]);

  results.push(A * B);
}

const finalResult = sum(results);

console.log(finalResult);
