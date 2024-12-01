import { loadInput } from "../utils";
const input = loadInput("challenges/day-01/input");
const list = input.split("\n");
const distances: number[] = [];
const col1: number[] = [];
const col2: number[] = [];
for (const item of list) {
  const itemList = item.split("   ");
  col1.push(Number(itemList[0]));
  col2.push(Number(itemList[1]));
}
col1.sort((a, b) => a - b);
col2.sort((a, b) => a - b);
for (let i = 0; i < col1.length; i++) {
  const result = col1[i] - col2[i];
  distances.push(Math.abs(result));
}
const finalResult = distances.reduce((acc, num) => acc + num);
console.log(finalResult);
