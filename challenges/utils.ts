import { readFileSync } from "fs";

export const loadInput = (file: string): string =>
  readFileSync(file, { encoding: "utf-8" });