import { loadInput } from "../utils";
const input = loadInput("challenges/day-01/input");
const splittedInput = input.split("\n");
const similarities: number[] = [];
const col1: number[] = [];
const col2: number[] = [];
for (const item of splittedInput) {
  const splittedItem = item.split("   ");
  col1.push(Number(splittedItem[0]));
  col2.push(Number(splittedItem[1]));
}
col1.sort((a, b) => a - b);
col2.sort((a, b) => a - b);
for (let i = 0; i < col1.length; i++) {
  const score = col2.filter((item) => item === col1[i]).length;
  if (score !== 0) {
    similarities.push(score * col1[i]);
  }
}
const finalResult = similarities.reduce((acc, num) => acc + num);
console.log(finalResult);
