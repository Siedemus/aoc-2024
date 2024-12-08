import { loadInput } from "../utils";

const input = loadInput("challenges/day-06/input");

type Map = ("." | "#" | "^")[][];
type Direction = "up" | "right" | "down" | "left";

const map = input
  .trim()
  .split("\n")
  .map((row) => row.split("")) as Map;

const directions: Record<Direction, { X: number; Y: number }> = {
  up: { X: 0, Y: -1 },
  right: { X: 1, Y: 0 },
  down: { X: 0, Y: 1 },
  left: { X: -1, Y: 0 },
};

const getInitialPosition = (): {
  X: number;
  Y: number;
  direction: Direction;
} => {
  const Y = map.findIndex((row) => row.includes("^"));
  const X = map[Y].findIndex((cell) => cell === "^");
  return { X, Y, direction: "up" };
};

const changeDirection = (currentDirection: Direction): Direction => {
  if (currentDirection === "up") {
    return "right";
  }

  if (currentDirection === "right") {
    return "down";
  }

  if (currentDirection === "down") {
    return "left";
  }

  return "up";
};

const simulateGuardPath = () => {
  let { X, Y, direction } = getInitialPosition();
  const visited = new Set<string>();
  visited.add(`${X},${Y}`);

  while (true) {
    const { X: dX, Y: dY } = directions[direction];
    const nextX = X + dX;
    const nextY = Y + dY;

    if (
      nextY < 0 ||
      nextY >= map.length ||
      nextX < 0 ||
      nextX >= map[0].length
    ) {
      break;
    }

    const newCell = map[nextY][nextX];

    if (newCell === "#") {
      direction = changeDirection(direction);
    } else {
      X = nextX;
      Y = nextY;
      visited.add(`${nextX},${nextY}`);
    }
  }

  return visited;
};

const visitedPlaces = simulateGuardPath();
console.log(visitedPlaces.size);
