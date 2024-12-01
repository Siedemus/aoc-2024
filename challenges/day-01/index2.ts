import { loadInput, sum } from "../utils";

const input = loadInput("challenges/day-01/input");
const splittedInput = input.split("\n");
const similarities: number[] = [];
const col1: number[] = [];
const col2: number[] = [];

for (const item of splittedInput) {
  const [x, y] = item.split(/\s+/);
  col1.push(Number(x));
  col2.push(Number(y));
}

for (let i = 0; i < col1.length; i++) {
  const score = col2.filter((item) => item === col1[i]).length;
  if (score !== 0) similarities.push(score * col1[i]);
}

const finalResult = sum(similarities);
console.log(finalResult);
