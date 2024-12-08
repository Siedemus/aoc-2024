import { loadInput, sum } from "../utils";

const input = loadInput("challenges/day-07/input");

const validResults: number[] = [];

const equations = input
  .split(/\n/)
  .map((row) => row.trim().split(": "))
  .map((row) => ({
    result: Number(row[0]),
    numbers: row[1].split(" ").map(Number),
  }));

const combineNumbers = (num1: number, num2: number) => {
  return Number(`${num1}${num2}`);
};

const canAchieveTarget = (numbers: number[], target: number) => {
  const stack: Array<[number, number]> = [];
  stack.push([0, numbers[0]]);

  while (stack.length > 0) {
    const [index, current] = stack.pop()!;

    if (index === numbers.length - 1) {
      if (current === target) {
        return true;
      }
      continue;
    }

    const nextNumber = numbers[index + 1];
    stack.push([index + 1, current + nextNumber]);
    stack.push([index + 1, current * nextNumber]);
    stack.push([index + 1, combineNumbers(current, nextNumber)]);
  }
};

for (const equation of equations) {
  const targetAchieved = canAchieveTarget(equation.numbers, equation.result);
  if (targetAchieved) {
    validResults.push(equation.result);
  }
}

const result = sum(validResults);
console.log(result);
