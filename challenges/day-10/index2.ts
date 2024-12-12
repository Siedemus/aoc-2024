import { loadInput } from "../utils";

const input = loadInput("challenges/day-10/input");
const map = input.split(/\n/).map((row) => row.trim().split("").map(Number));

type YX = { Y: number; X: number };
type Map = number[][];

const searchTrails = (
	y: number,
	x: number,
	trail: YX[],
	map: Map,
	trails: YX[][],
) => {
	const current = map[y][x];

	if (current === 9) {
		trails.push([...trail, { Y: y, X: x }]);
		return;
	}

	const directions = [
		{ dy: -1, dx: 0 },
		{ dy: 1, dx: 0 },
		{ dy: 0, dx: 1 },
		{ dy: 0, dx: -1 },
	];

	for (let i = 0; i < directions.length; i++) {
		const ny = y + directions[i].dy;
		const nx = x + directions[i].dx;

		if (ny >= 0 && ny < map.length && nx >= 0 && nx < map[ny].length) {
			if (map[ny][nx] === current + 1) {
				searchTrails(ny, nx, [...trail, { Y: y, X: x }], map, trails);
			}
		}
	}
};

const findTrailheads = (map: Map) => {
	const trails: YX[][] = [];

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (map[y][x] === 0) {
				searchTrails(y, x, [], map, trails);
			}
		}
	}

	return trails;
};

const trails = findTrailheads(map);

console.log(trails.length);
