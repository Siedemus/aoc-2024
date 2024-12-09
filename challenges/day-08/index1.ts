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
  const antinodes: { X: number; Y: number }[] = [];

  for (const antenna of Object.values(antennas)) {
    for (let i = 0; i < antenna.length; i++) {
      for (let j = 0; j < antenna.length; j++) {
        if (i === j) {
          continue;
        }

        const distanceY = antenna[i].Y - antenna[j].Y;
        const distanceX = antenna[i].X - antenna[j].X;

        const antinodeY = antenna[i].Y + distanceY;
        const antinodeX = antenna[i].X + distanceX;

        if (antinodeY >= 0 && antinodeY < map.length) {
          if (antinodeX >= 0 && antinodeX < map[antenna[i].Y].length) {
            if (
              !antinodes.some(
                (antinode) =>
                  antinode.X === antinodeX && antinode.Y === antinodeY
              )
            ) {
              antinodes.push({ Y: antinodeY, X: antinodeX });
            }
          }
        }
      }
    }
  }

  return antinodes;
};

const antennas = localizeAntennas(map);
const antinodes = setAntinodes(antennas, map);

console.log(antinodes.length);
