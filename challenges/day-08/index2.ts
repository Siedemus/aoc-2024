import { loadInput } from "../utils";

const input = loadInput("challenges/day-08/input");

type Antennas = Record<
  string,
  {
    Y: number;
    X: number;
  }[]
>;

const map = input.split(/\n/).map((row) => row.trim().split(""));

const localizeAntennas = (map: string[][]) => {
  const antennas: Antennas = {};

  for (let Y = 0; Y < map.length; Y++) {
    for (let X = 0; X < map[Y].length; X++) {
      const antenna = map[Y][X];

      if (antenna !== ".") {
        if (!antennas[antenna]) {
          antennas[antenna] = [];
        }

        antennas[antenna].push({ Y, X });
      }
    }
  }

  return antennas;
};

const setAntinodes = (antennas: Antennas, map: string[][]) => {
  const antinodes: Set<string> = new Set();

  for (const antenna of Object.values(antennas)) {
    for (let i = 0; i < antenna.length; i++) {
      for (let j = 0; j < antenna.length; j++) {
        if (i === j) {
          continue;
        }

        const distanceY = antenna[i].Y - antenna[j].Y;
        const distanceX = antenna[i].X - antenna[j].X;

        let currentY = antenna[i].Y;
        let currentX = antenna[i].X;

        antinodes.add(`${currentY}|${currentX}`);

        while (true) {
          currentY += distanceY;
          currentX += distanceX;
          if (
            currentY < 0 ||
            currentY >= map.length ||
            currentX < 0 ||
            currentX >= map.length
          ) {
            break;
          }

          antinodes.add(`${currentY}|${currentX}`);
        }
      }
    }
  }

  return antinodes;
};

const antennas = localizeAntennas(map);
const antinodes = setAntinodes(antennas, map);

console.log(antinodes.size);
