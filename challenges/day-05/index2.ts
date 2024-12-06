import { loadInput, sum } from "../utils";

const input1 = loadInput("challenges/day-05/input1");
const input2 = loadInput("challenges/day-05/input2");

const rules = input1.split(/\n/).map((rule) => rule.split("|").map(Number));
const updates = input2
  .split(/\n/)
  .map((update) => update.split(",").map(Number));

const pages: number[] = [];

const isUpdateValid = (update: number[], rules: number[][]) => {
  return rules.every(([X, Y]) => {
    const xIndex = update.indexOf(X);
    const yIndex = update.indexOf(Y);

    if (xIndex < yIndex) {
      return true;
    }

    return false;
  });
};

const correctUpdate = (update: number[], rules: number[][]) => {
  const corrected = [...update];
  let changed;
  do {
    changed = false;
    for (const [X, Y] of rules) {
      const xIndex = corrected.indexOf(X);
      const yIndex = corrected.indexOf(Y);

      if (xIndex > yIndex) {
        [corrected[xIndex], corrected[yIndex]] = [
          corrected[yIndex],
          corrected[xIndex],
        ];
        changed = true;
      }
    }
  } while (changed);

  return corrected;
};

for (const update of updates) {
  const foundRules = rules.filter(
    ([X, Y]) => update.includes(X) && update.includes(Y)
  );

  const isValid = isUpdateValid(update, foundRules);

  if (!isValid) {
    const corrected = correctUpdate(update, foundRules);
    pages.push(corrected[Math.floor(corrected.length / 2)]);
  }
}

const result = sum(pages);
console.log(result);
