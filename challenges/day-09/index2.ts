import { loadInput, sum } from "../utils";

const input = loadInput("challenges/day-09/input");

type DiskMap = (
  | {
      type: "id";
      count: number;
      id: number;
    }
  | {
      type: "empty";
      count: number;
    }
)[];

const createDiskMap = (input: string): DiskMap => {
  let id = 0;
  return input
    .split("")
    .map((c, i) => {
      const count = Number(c);
      if (i % 2 === 0) {
        return { type: "id" as const, count, id: id++ };
      }

      return { type: "empty" as const, count };
    })
    .filter((block) => block.count !== 0);
};

const rearrangeMemory = (diskMap: DiskMap) => {
  const fileMap = [];
  const blockPosition = [];
  let totalCount = 0;

  for (const block of diskMap) {
    if (block.type === "id") {
      blockPosition.push({
        id: block.id,
        count: block.count,
        start: totalCount,
      });
    }
    for (let i = 0; i < block.count; i++) {
      fileMap.push(block.type === "id" ? block.id : -1);
    }
    totalCount += block.count;
  }

  for (let i = blockPosition.length - 1; i >= 0; i--) {
    const { id, count, start } = blockPosition[i];

    for (let j = 0; j < start; j++) {
      if (fileMap[j] === -1) {
        let space = 0;

        for (let k = j; k < fileMap.length && fileMap[k] === -1; k++) {
          space++;
        }

        if (space >= count) {
          for (let k = 0; k < count; k++) {
            fileMap[j + k] = id;
            fileMap[start + k] = -1;
          }

          blockPosition[i].start = j;
          break;
        }
      }
    }
  }

  return fileMap;
};

const processChecksums = (fileMap: number[]) => {
  const checksums: number[] = [];

  for (let i = 0; i < fileMap.length; i++) {
    if (fileMap[i] === -1) {
      continue;
    }

    checksums.push(i * fileMap[i]);
  }

  return checksums;
};

const diskMap = createDiskMap(input);
const rearranged = rearrangeMemory(diskMap);
const checksums = processChecksums(rearranged);

console.log(sum(checksums));

