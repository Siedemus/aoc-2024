import { difference, loadInput } from "../utils";

const input = loadInput("challenges/day-02/input");
const reports = input
  .split(/\n/)
  .map((report) => report.trim().split(/\s/).map(Number));

const isSafeReport = (report: number[]) => {
  const isIncreasing = report.every((level, index) => {
    if (index === 0) return true;
    const diff = report[index - 1] - level;
    return diff >= 1 && diff <= 3;
  });

  const isDecreasing = report.every((level, index) => {
    if (index === 0) return true;
    const diff = level - report[index - 1];
    return diff >= 1 && diff <= 3;
  });

  return isIncreasing || isDecreasing;
};

const reportsFilter = (report: number[]) => {
  if (isSafeReport(report)) return true;

  for (let i = 0; i < report.length; i++) {
    const newReport = report.filter((_, index) => index !== i);
    if (isSafeReport(newReport)) return true;
  }

  return false;
};

const safeReports = reports.filter(reportsFilter);

console.log(safeReports.length);
