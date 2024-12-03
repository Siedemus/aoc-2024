import { loadInput, sum } from "../utils";

const input = loadInput("challenges/day-03/input");

const matches = input.matchAll(new RegExp(/mul\((\d{1,3}),(\d{1,3})\)/g));
const results = Array.from(matches).map(([, A, B]) => {
  return Number(A) * Number(B);
});

console.log(sum(results));
