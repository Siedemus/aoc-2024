import { loadInput, sum } from "../utils";

const input = loadInput("challenges/day-13/input");
const lines = input.trim().split("\n");
const results: { A: number[]; B: number[]; results: number[] }[] = [];

for (let i = 0; i < lines.length; i += 4) {
  const buttonA = lines[i]
    .match(/X\+(\d+), Y\+(\d+)/)!
    .slice(1, 3)
    .map(Number);
  const buttonB = lines[i + 1]
    .match(/X\+(\d+), Y\+(\d+)/)!
    .slice(1, 3)
    .map(Number);
  const prize = lines[i + 2]
    .match(/X=(\d+), Y=(\d+)/)!
    .slice(1, 3)
    .map(Number)
    .map((num) => num + 10000000000000);

  results.push({
    A: buttonA,
    B: buttonB,
    results: prize,
  });
}

const solveEquation = (result: {
  A: number[];
  B: number[];
  results: number[];
}) => {
  const [a1, a2] = result.A;
  const [b1, b2] = result.B;
  const [r1, r2] = result.results;

  const determinant = a1 * b2 - a2 * b1;

  if (determinant === 0) return false;

  const determinantX = r1 * b2 - r2 * b1;
  const determinantY = a1 * r2 - a2 * r1;

  const x = determinantX / determinant;
  const y = determinantY / determinant;

  if (!Number.isInteger(x) || !Number.isInteger(y)) return false;

  return [x, y];
};

const countPoints = (
  results: { A: number[]; B: number[]; results: number[] }[]
) => {
  const A: number[] = [],
    B: number[] = [];

  for (const result of results) {
    const isValid = solveEquation(result);

    console.log(isValid);
    

    if (isValid) {
      A.push(isValid[0]);
      B.push(isValid[1]);
    }
  }

  return sum(A.map((num) => num * 3)) + sum(B);
};

console.log(countPoints(results));
