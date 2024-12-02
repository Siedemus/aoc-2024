import { difference, loadInput } from "../utils";

const input = loadInput("challenges/day-02/input");
const reports = input
  .split(/\n/)
  .map((report) => report.trim().split(/\s/).map(Number));

const increasingReports = reports.filter((report) =>
  report.every((level, index) => index === 0 || level > report[index - 1])
);
const decreasingReports = reports.filter((report) =>
  report.every((level, index) => index === 0 || level < report[index - 1])
);

const validReports = Array.from([...increasingReports, ...decreasingReports]);

const safeReports = validReports.filter((rep) => {
  for (let i = 1; i < rep.length; i++) {
    const diff = difference(rep[i - 1], rep[i]);

    if (diff < 1 || diff > 3) {
      return false;
    }
  }
  return true;
});

console.log(safeReports.length);
