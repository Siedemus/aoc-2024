import { loadInput } from "../utils";

const input = loadInput("challenges/day-04/input");
const rows = input.split(/\n/);

let counter = 0;

for (let row = 0; row < rows.length; row++) {
  const currentRow = rows[row];
  for (let col = 0; col < currentRow.length - 3; col++) {
    const currentWord = currentRow.slice(col, col + 4);

    if (currentWord === "XMAS" || currentWord === "SAMX") {
      counter++;
    }
  }
}

for (let row = 0; row < rows.length - 3; row++) {
  const currentRow = rows[row];
  for (let col = 0; col < currentRow.length; col++) {
    const currentWord =
      currentRow[col] +
      rows[row + 1][col] +
      rows[row + 2][col] +
      rows[row + 3][col];

    if (currentWord === "XMAS" || currentWord === "SAMX") {
      counter++;
    }
  }
}

for (let row = 0; row < rows.length - 3; row++) {
  const currentRow = rows[row];
  for (let col = 0; col < currentRow.length; col++) {
    const currentWord =
      currentRow[col] +
      rows[row + 1][col + 1] +
      rows[row + 2][col + 2] +
      rows[row + 3][col + 3];

    if (currentWord === "XMAS" || currentWord === "SAMX") {
      counter++;
    }
  }
}

for (let row = 0; row < rows.length - 3; row++) {
  const currentRow = rows[row];
  for (let col = 3; col < currentRow.length; col++) {
    const currentWord =
      currentRow[col] +
      rows[row + 1][col - 1] +
      rows[row + 2][col - 2] +
      rows[row + 3][col - 3];

    if (currentWord === "XMAS" || currentWord === "SAMX") {
      counter++;
    }
  }
}

console.log(counter);
