import { loadInput } from "../utils";

const input = loadInput("challenges/day-11/input");
const rocks = input.split(" ").map(Number);

function countStonesAfterTransformation(
	stone: number,
	blinks: number,
	cache: Map<string, number>,
): number {
	const key = `${stone}|${blinks}`;

	if (cache.has(key)) return cache.get(key) as number;

	if (blinks === 0) return 1;

	const stoneStr = String(stone);
	let stoneCount = 0;

	if (stone === 0) {
		stoneCount = countStonesAfterTransformation(1, blinks - 1, cache);
	} else if (stoneStr.length % 2 === 0) {
		const mid = stoneStr.length / 2;
		const leftStone = Number(stoneStr.slice(0, mid));
		const rightStone = Number(stoneStr.slice(mid));

		stoneCount =
			countStonesAfterTransformation(leftStone, blinks - 1, cache) +
			countStonesAfterTransformation(rightStone, blinks - 1, cache);
	} else {
		stoneCount = countStonesAfterTransformation(stone * 2024, blinks - 1, cache);
	}

	cache.set(key, stoneCount);
	return stoneCount;
}

function getStonesCount(stones: number[], blinks: number): number {
	let totalStones = 0;
	const cache = new Map<string, number>();

	for (const stone of stones) {
		totalStones += countStonesAfterTransformation(stone, blinks, cache);
	}

	return totalStones;
}

console.log(getStonesCount(rocks, 25));
console.log(getStonesCount(rocks, 75));
