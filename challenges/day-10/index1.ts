import { loadInput, sum } from "../utils";

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

const findTrailheads = (map: Map, trails: YX[][]) => {
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (map[y][x] === 0) {
				searchTrails(y, x, [], map, trails);
			}
		}
	}
};

const sortTrails = (trails: YX[][]) => {
	const validTrails: { [key: string]: { [key: string]: boolean } } = {};

	for (const trail of trails) {
		const firstKey = `${trail[0].Y}||${trail[0].X}`;
		const lastKey = `${trail[trail.length - 1].Y}||${trail[trail.length - 1].X}`;

		if (!validTrails[firstKey]) {
			validTrails[firstKey] = {};
		}

		validTrails[firstKey][lastKey] = true;
	}

	return validTrails;
};

const countPoints = (validTrails: {
	[key: string]: {
		[key: string]: boolean;
	};
}) => {
	let sum = 0;

	for (const trail of Object.values(validTrails)) {
		sum += Object.values(trail).length;
	}

	return sum;
};

const trails: YX[][] = [];
findTrailheads(map, trails);
const validTrails = sortTrails(trails);
const finalSum = countPoints(validTrails);

console.log(finalSum);
