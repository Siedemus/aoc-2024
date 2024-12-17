import { loadInput } from "../utils";

type Map = string[][];
type YX = { y: number; x: number };

const input = loadInput("challenges/day-16/input");
const map = input.split(/\n/).map((row) => row.split(""));

const directions = [
  { dy: -1, dx: 0 },
  { dy: 1, dx: 0 },
  { dy: 0, dx: 1 },
  { dy: 0, dx: -1 },
];

const findStartPosition = (map: Map): YX | undefined => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].toLocaleUpperCase() === "S") {
        return { y, x };
      }
    }
  }
};
