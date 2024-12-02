import { readFileSync } from "fs";

export const loadInput = (file: string): string =>
  readFileSync(file, { encoding: "utf-8" });

export const sum = (arr: number[]) => arr.reduce((acc, el) => acc + el, 0);

export const difference = (a: number, b: number) => {
  return Math.abs(a - b);
};
