import { loadInput } from "../utils";

const input = loadInput("challenges/day-11/input");
const rocks = input.split(" ");

const blink = (rocks: string[], loops = 25) => {
	let tempRocks = [...rocks];

	for (let i = 0; i < loops; i++) {
		const newTempRocks: string[] = [];
		for (const rock of tempRocks) {
			if (rock === "0") {
				newTempRocks.push("1");
				continue;
			}

			if (rock.length % 2 === 0) {
				const half = rock.length / 2;
				const firstHalf = rock.slice(0, half);
				const secondHalf = rock.slice(half);

				newTempRocks.push(firstHalf);

				if (secondHalf.split("").every((number) => number === "0")) {
					newTempRocks.push("0");
				} else {
					newTempRocks.push(secondHalf.replace(/^0+/, ""));
				}

				continue;
			}

			newTempRocks.push(`${Number(rock) * 2024}`);
		}
		tempRocks = newTempRocks;
	}

	return tempRocks;
};

const finalRocks = blink(rocks);
console.log(finalRocks.length);
