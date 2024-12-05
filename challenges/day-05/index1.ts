import { loadInput, sum } from "../utils";

const input1 = loadInput("challenges/day-05/input1");
const input2 = loadInput("challenges/day-05/input2");

const rules = input1.split(/\n/).map((rule) => rule.split("|").map(Number));
const updates = input2
  .split(/\n/)
  .map((update) => update.split(",").map(Number));

const pages: number[] = [];

for (const update of updates) {
  const isValidUpdate = rules.every((rule) => {
    const [X, Y] = rule;

    if (update.includes(X) && update.includes(Y)) {
      const indexOfX = update.indexOf(X);
      const indexOfY = update.indexOf(Y);
      return indexOfX < indexOfY;
    }

    return true;
  });

  if (isValidUpdate) {
    const middleIndex = Math.floor(update.length / 2);
    const middlePage = update[middleIndex];
    pages.push(middlePage);
  }
}

const result = sum(pages);

console.log(result);
