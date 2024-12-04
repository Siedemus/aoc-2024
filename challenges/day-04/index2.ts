import { loadInput } from "../utils";

const input = loadInput("challenges/day-04/input");
const rows = input.split(/\n/);

let counter = 0;

for (let row = 1; row < rows.length - 1; row++) {
  const previousRow = rows[row - 1];
  const nextRow = rows[row + 1];
  const currentRow = rows[row];
  for (let col = 1; col < currentRow.length - 1; col++) {
    const letter = currentRow[col];

    if (letter === "A") {
      if (
        previousRow[col - 1] === "M" &&
        ((previousRow[col + 1] === "M" &&
          nextRow[col - 1] === "S" &&
          nextRow[col + 1] === "S") ||
          (previousRow[col + 1] === "S" &&
            nextRow[col - 1] === "M" &&
            nextRow[col + 1] === "S"))
      ) {
        counter++;
      }
      if (
        previousRow[col - 1] === "S" &&
        ((previousRow[col + 1] === "S" &&
          nextRow[col - 1] === "M" &&
          nextRow[col + 1] === "M") ||
          (previousRow[col + 1] === "M" &&
            nextRow[col - 1] === "S" &&
            nextRow[col + 1] === "M"))
      ) {
        counter++;
      }
    }
  }
}

console.log(counter);
