import { loadInput, sum } from "../utils";

const input = loadInput("challenges/day-01/input");
const list = input.split("\n");
const distances: number[] = [];
const col1: number[] = [];
const col2: number[] = [];

for (const item of list) {
  const [x, y] = item.split(/\s+/);
  col1.push(Number(x));
  col2.push(Number(y));
}

col1.sort((a, b) => a - b);
col2.sort((a, b) => a - b);

for (let i = 0; i < col1.length; i++) {
  const result = col1[i] - col2[i];
  distances.push(Math.abs(result));
}

const finalResult = sum(distances);
console.log(finalResult);
