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
  if (currentDirection === "up") return "right";
  if (currentDirection === "right") return "down";
  if (currentDirection === "down") return "left";
  return "up";
};

const detectLoop = (tempObstacle: { X: number; Y: number }) => {
  let { X, Y, direction } = getInitialPosition();
  const visited = new Set<string>();

  const tempMap = map.map(row => [...row])
  tempMap[tempObstacle.Y][tempObstacle.X] = "#";

  while (true) {
    const currentState = `${X},${Y},${direction}`;
    if (visited.has(currentState)) {
      return true;
    }

    visited.add(currentState);

    const { X: dX, Y: dY } = directions[direction];
    const nextX = X + dX;
    const nextY = Y + dY;

    if (
      nextX < 0 ||
      nextX >= map[0].length ||
      nextY < 0 ||
      nextY >= map.length
    ) {
      return false;
    }

    const newCell = tempMap[nextY][nextX];

    if (newCell === "#") {
      direction = changeDirection(direction);
    } else {
      X = nextX;
      Y = nextY;
    }
  }
};

const findValidObstaclePositions = () => {
  const validPositions = [];

  for (let Y = 0; Y < map.length; Y++) {
    for (let X = 0; X < map[Y].length; X++) {
      if (
        map[Y][X] === "." &&
        !(X === getInitialPosition().X && Y === getInitialPosition().Y)
      ) {
        if (detectLoop({ X, Y })) {
          validPositions.push({ X, Y });
        }
      }
    }
  }
  return validPositions.length;
};

const validObstacleCount = findValidObstaclePositions();
console.log(validObstacleCount);
