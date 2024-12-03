import { log } from "util";
import { loadInput, sum } from "../utils";

const input = loadInput("challenges/day-03/input");

const generalRegex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
const mulRegex = /mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/;

const matches = input.matchAll(new RegExp(generalRegex));

let processing = true;
const results = Array.from(matches).map(([match]) => {
  if (match === "do()") {
    processing = true;
  }

  if (match === "don't()") {
    processing = false;
  }

  if (processing && mulRegex.test(match)) {
    const mulMatch = mulRegex.exec(match);
    if (mulMatch) {
      const [, A, B] = mulMatch;
      return Number(A) * Number(B);
    }
  }

  return 0;
});

console.log(sum(results));
